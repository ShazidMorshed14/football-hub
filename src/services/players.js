import { dummyPlayersList } from "../dummyData/dummyData";
import axios from "./axios";

export const GetCategorywisePlayers = async (params) => {
  try {
    let playerInfoResponses = [];

    const response = await axios().get("/markets/players-market-value", {
      params,
    });

    playerInfoResponses = [...response?.data?.data];
    console.log(playerInfoResponses);

    // Extracting player IDs from the response data
    const playerIds = response?.data?.data?.map((player) => player.id) || [];
    const playerIdsInComma = playerIds.join(",");

    const playersShortInfo = await axios().get(
      `/players/short-info?locale=ES&player_ids=${playerIdsInComma}`
    );

    let playerShortInfoList = playersShortInfo?.data?.data || [];
    console.log(playerShortInfoList);

    playerInfoResponses.forEach((player1) => {
      const matchingPlayer = playerShortInfoList.find(
        (player2) => player2.id === player1.id
      );
      if (matchingPlayer) {
        player1.playerInfo = matchingPlayer;
      }
    });

    console.log(playerInfoResponses);

    return playerInfoResponses;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const GetCategorywisePlayersDummy = async (params) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(dummyPlayersList);
      }, 1500);
    });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
