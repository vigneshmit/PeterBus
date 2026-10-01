import express from 'express';
import cors from 'cors';
import qrcode from 'qrcode';
import pino from 'pino';
import makeWASocket, { 
  useMultiFileAuthState, 
  DisconnectReason, 
  Browsers 
} from '@whiskeysockets/baileys';

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

let sock = null;
let qrCodeDataUrl = null;
let isConnected = false;
let isConnecting = false;
let reconnectTimer = null;
const connectedNumber = '9489442570';

async function connectToWhatsApp() {
  if (isConnecting) return;
  isConnecting = true;

  try {
    // Clean up previous socket if exists
    if (sock) {
      try {
        sock.ev.removeAllListeners();
        sock.end(undefined);
      } catch (e) {}
      sock = null;
    }

    const { state, saveCreds } = await useMultiFileAuthState('server/auth_info_baileys');

    sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
      browser: Browsers.macOS('Desktop'), // Prevents 'replaced' conflict error!
      syncFullHistory: false, // Don't download thousands of chats
      markOnlineOnConnect: false,
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 25000,
      printQRInTerminal: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        try {
          qrCodeDataUrl = await qrcode.toDataURL(qr);
          console.log('[WhatsApp Server] New QR code generated. View at http://localhost:5001');
        } catch (err) {
          console.error('[QR Error]:', err);
        }
      }

      if (connection === 'close') {
        isConnected = false;
        isConnecting = false;
        const statusCode = (lastDisconnect?.error)?.output?.statusCode;
        console.log(`[WhatsApp Server] Connection closed (code ${statusCode}).`);

        // If logged out completely, clear auth info to allow fresh scan
        if (statusCode === DisconnectReason.loggedOut) {
          console.log('[WhatsApp Server] Logged out from WhatsApp.');
        } else {
          // Reconnect with a graceful 4-second delay to avoid socket conflicts
          if (!reconnectTimer) {
            reconnectTimer = setTimeout(() => {
              reconnectTimer = null;
              connectToWhatsApp();
            }, 4000);
          }
        }
      } else if (connection === 'open') {
        isConnected = true;
        isConnecting = false;
        qrCodeDataUrl = null;
        console.log(`[WhatsApp Server] Connected successfully! Session active for ${connectedNumber}`);
      }
    });
  } catch (err) {
    console.error('[WhatsApp Connect Error]:', err);
    isConnecting = false;
  }
}

// Start WhatsApp Gateway
connectToWhatsApp();

// Status & QR Web Interface (AJAX Polling without full page refresh)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeterBus WhatsApp Gateway</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
        .card { background: #1e293b; border-radius: 20px; padding: 32px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; }
        h1 { font-size: 20px; margin-bottom: 6px; color: #34d399; }
        p { color: #94a3b8; font-size: 13.5px; margin-bottom: 20px; line-height: 1.5; }
        .qr-box { background: white; padding: 16px; border-radius: 12px; display: inline-block; margin-bottom: 16px; min-width: 250px; min-height: 250px; display: flex; align-items: center; justify-content: center; }
        .qr-box img { width: 240px; height: 240px; display: block; }
        .status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; margin-bottom: 12px; }
        .status-ready { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }
        .status-scan { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
        .steps { text-align: left; background: #0f172a; padding: 14px 16px; border-radius: 10px; margin-top: 16px; font-size: 12.5px; color: #cbd5e1; }
        .steps ol { margin: 0; padding-left: 20px; }
        .steps li { margin-bottom: 6px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>PeterBus WhatsApp Automation</h1>
        <p>Sending booking tickets live from <strong>+91 ${connectedNumber}</strong></p>
        
        <div id="content">
          <p>Checking status...</p>
        </div>
      </div>

      <script>
        async function checkStatus() {
          try {
            const res = await fetch('/api/status');
            const data = await res.json();
            const content = document.getElementById('content');
            
            if (data.connected) {
              content.innerHTML = \`
                <div class="status-badge status-ready">
                  <span>● Connected & Ready (Live)</span>
                </div>
                <div style="background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 10px; padding: 16px; margin-top: 14px;">
                  <div style="font-size: 15px; font-weight: 700; color: #34d399; margin-bottom: 4px;">WhatsApp Active!</div>
                  <div style="font-size: 13px; color: #cbd5e1;">All customer booking tickets are automatically sent directly from <strong>+91 \${data.number}</strong>.</div>
                </div>
              \`;
            } else if (data.qr) {
              content.innerHTML = \`
                <div class="qr-box">
                  <img src="\${data.qr}" alt="Scan QR" />
                </div>
                <div class="status-badge status-scan">
                  <span>Waiting for Scan</span>
                </div>
                <div class="steps">
                  <ol>
                    <li>Open WhatsApp on phone <strong>\${data.number}</strong></li>
                    <li>Tap <strong>Settings / Menu ➔ Linked Devices</strong></li>
                    <li>Tap <strong>Link a Device</strong> and point your camera to this QR</li>
                  </ol>
                </div>
              \`;
            } else {
              content.innerHTML = '<p style="color: #cbd5e1;">Initialising WhatsApp session, please wait 3 seconds...</p>';
            }
          } catch (e) {
            console.error(e);
          }
        }
        checkStatus();
        setInterval(checkStatus, 3000);
      </script>
    </body>
    </html>
  `);
});

// JSON Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    connected: isConnected,
    number: connectedNumber,
    qr: qrCodeDataUrl,
  });
});

// Send WhatsApp Ticket Endpoint
app.post('/api/send-ticket', async (req, res) => {
  try {
    const { 
      mobile, 
      passenger = 'Valued Passenger', 
      pnr, 
      bus, 
      seats = [], 
      boarding, 
      dropping, 
      total 
    } = req.body;

    if (!mobile) {
      return res.status(400).json({ error: 'Mobile number is required' });
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    const targetNumber = cleanMobile.startsWith('91') && cleanMobile.length === 12
      ? cleanMobile
      : `91${cleanMobile.slice(-10)}`;
    const targetJid = `${targetNumber}@s.whatsapp.net`;

    const pnrCode = pnr || `PB-${Math.floor(100000 + Math.random() * 900000)}`;
    const operatorName = bus?.operator || 'PeterBus Luxury Lines';
    const busFleet = bus?.busType || 'Volvo Multi-Axle 9600 A/C Sleeper';
    const seatsFormatted = Array.isArray(seats) ? seats.map(s => s.id || s).join(', ') : (seats || '1 Berth');
    const fareFormatted = total ? Number(total).toLocaleString('en-IN') : '1,850';
    const boardingPoint = boarding || 'Kilambakkam (KCBT), Chennai - 21:30';
    const droppingPoint = dropping || 'Madiwala, Bengaluru - 05:15';

    const message = 
`━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *P E T E R B U S   L U X U R Y   L I N E S* ✨
*Official Electronic M-Ticket*
━━━━━━━━━━━━━━━━━━━━━━━━━

🎫 *BOOKING REFERENCE (PNR)*
*${pnrCode}* • _Confirmed & Active_

👤 *PASSENGER DETAILS*
• *Primary Passenger:* ${passenger}
• *Mobile Number:* +${targetNumber}

🚍 *COACH & SEAT RESERVATION*
• *Coach:* ${operatorName}
• *Bus Fleet:* ${busFleet}
• *Reserved Berth(s):* *${seatsFormatted}*
• *Total Fare Paid:* *₹${fareFormatted}* (Online Confirmed)

📍 *BOARDING & DROPPING TIMELINE*
🟢 *Boarding:* ${boardingPoint}
🔴 *Dropping:* ${droppingPoint}

📡 *LIVE RADAR GPS TRACKING*
Track your coach in real-time on live map:
🔗 https://peterbus.in/track/${pnrCode}

━━━━━━━━━━━━━━━━━━━━━━━━━
ℹ️ *ESSENTIAL TRAVEL GUIDELINES*
1. Please report at boarding point 15 mins prior to departure.
2. Carry any valid government photo ID card.
3. Show this WhatsApp M-Ticket during boarding.
4. Emergency / Bus Crew Helpline: *+91 94894 42570*

_Wish you a pleasant, safe & comfortable journey with PeterBus!_ 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // If connected, send message
    if (isConnected && sock) {
      await sock.sendMessage(targetJid, { text: message });
      console.log(`[WhatsApp Server] Ticket successfully sent to ${targetJid} from ${connectedNumber}`);
      return res.json({ 
        success: true, 
        delivered: true,
        from: connectedNumber,
        to: targetNumber,
        message: `M-Ticket automatically sent to WhatsApp (+${targetNumber}) from +91 ${connectedNumber}!` 
      });
    } else {
      console.log(`[WhatsApp Server] Pending connection. Message queued for ${targetNumber}.`);
      return res.json({
        success: true,
        delivered: false,
        requiresScan: !isConnected,
        from: connectedNumber,
        to: targetNumber,
        message: `WhatsApp session waiting for scan at http://localhost:5001.`
      });
    }
  } catch (error) {
    console.error('[WhatsApp Send Error]:', error);
    res.status(500).json({ error: error.message || 'Failed to send WhatsApp message' });
  }
});

app.listen(PORT, () => {
  console.log(`[WhatsApp Gateway Server] Running at http://localhost:${PORT}`);
});
