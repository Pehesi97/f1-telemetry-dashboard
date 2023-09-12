const { F1TelemetryClient, constants } = require('@racehub-io/f1-telemetry-client');
const { PACKETS } = constants;
const http = require('http')

const { Server } = require("socket.io");

const server = http.createServer();
server.listen(3000, "0.0.0.0");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const client = new F1TelemetryClient({ port: 20777, bigintEnabled: false });
client.start();

client.on(PACKETS.lapData, (data) => {
  io.emit("lapData", {
    position: data.m_lapData[data.m_header.m_playerCarIndex].m_carPosition,
    lastLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_lastLapTime,
    bestLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_bestLapTime,
    currentLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapTime,
    sector1Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector1Time,
    sector2Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector2Time,
    currentLapNum: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapNum
  });
})

client.on(PACKETS.carTelemetry, (data) => {
  io.emit("telemetryData", {
    throttle: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_throttle,
    brake: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_brake,
    gear: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_gear,
    speed: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_speed,
    frame: data.m_header.m_frameIdentifier
  });
});

module.exports = server;
