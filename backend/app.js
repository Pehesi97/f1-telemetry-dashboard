"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const f1_telemetry_client_1 = require("@racehub-io/f1-telemetry-client");
const { PACKETS } = f1_telemetry_client_1.constants;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const server = http_1.default.createServer();
server.listen(3000, "0.0.0.0");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
const client = new f1_telemetry_client_1.F1TelemetryClient({ port: 20777, bigintEnabled: false });
client.start();
client.on(PACKETS.lapData, (data) => {
    io.emit("lapData", {
        position: data.m_lapData[data.m_header.m_playerCarIndex].m_carPosition,
        lastLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_lastLapTimeInMS,
        currentLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapTimeInMS,
        sector1Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector1TimeMinutes,
        sector2Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector2TimeMinutes,
        currentLapNum: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapNum
    });
});
client.on(PACKETS.carTelemetry, (data) => {
    io.emit("telemetryData", {
        throttle: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_throttle,
        brake: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_brake,
        gear: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_gear,
        speed: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_speed,
        frame: data.m_header.m_frameIdentifier
    });
});
client.on(PACKETS.session, (data) => {
    io.emit("sessionData", {
        aiDifficulty: data.m_aiDifficulty
    });
});
client.on(PACKETS.lobbyInfo, (data) => {
});
exports.default = server;
