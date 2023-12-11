import { F1TelemetryClient, constants } from '@racehub-io/f1-telemetry-client';
import { PacketLapData, PacketCarTelemetryData, PacketSessionData, PacketSessionHistoryData, PacketLobbyInfoData, PacketCarStatusData, PacketParticipantsData } from '@racehub-io/f1-telemetry-client/build/main/parsers/packets/types';

const { PACKETS } = constants;

import http from 'http';
import { Server, Socket } from "socket.io";

const server: http.Server = http.createServer();
server.listen(3000, "0.0.0.0");

const io: Server = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
});

const client: F1TelemetryClient = new F1TelemetryClient({ port: 20777, bigintEnabled: false });
client.start();



client.on(PACKETS.lapData, (data: PacketLapData) => {
  io.emit("lapData", {
    position: data.m_lapData[data.m_header.m_playerCarIndex].m_carPosition,
    lastLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_lastLapTimeInMS,
    currentLapTime: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapTimeInMS,
    sector1Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector1TimeMinutes,
    sector2Time: data.m_lapData[data.m_header.m_playerCarIndex].m_sector2TimeMinutes,
    currentLapNum: data.m_lapData[data.m_header.m_playerCarIndex].m_currentLapNum
  });
});

client.on(PACKETS.carTelemetry, (data: PacketCarTelemetryData) => {
  io.emit("telemetryData", {
    throttle: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_throttle,
    brake: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_brake,
    gear: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_gear,
    speed: data.m_carTelemetryData[data.m_header.m_playerCarIndex].m_speed,
    frame: data.m_header.m_frameIdentifier,
  });
});

client.on(PACKETS.carStatus, (data: PacketCarStatusData) => {
  let tyreWearData = [] as any[]
  data.m_carStatusData.forEach((car) => {
    tyreWearData.push({
      a: car.m_tyresWear?.[0] ?? 0,
      b: car.m_tyresWear?.[1] ?? 0,
      c: car.m_tyresWear?.[2] ?? 0,
      d: car.m_tyresWear?.[3] ?? 0,
    })
  });
  io.emit('tyreWearData', {
    data: tyreWearData
  })
})

client.on(PACKETS.participants, (data: PacketParticipantsData) => {
  io.emit('drivers', {
    drivers: data.m_participants,
    driverCount: data.m_numActiveCars
  })
})

client.on(PACKETS.session, (data: PacketSessionData) => {
  io.emit("sessionData", {
    aiDifficulty: data.m_aiDifficulty,
    track: constants.TRACKS[data.m_trackId].name,
    weather: data.m_weather,
  });
});

client.on(PACKETS.lobbyInfo, (data: PacketLobbyInfoData) => {
  io.emit("lobbyInfo", {
    players: data.m_lobbyPlayers,
    playerNumbers: data.m_numPlayers
  })
});

export default server;
