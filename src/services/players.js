import {
  dummyPlayersList,
  dummySearchRes,
  playerDetailsDummyResponse,
} from "../dummyData/dummyData";
import { isArrayAndHasContent } from "../utils/utils";
import axios from "./axios";

export const GetCategorywisePlayers = async ({
  pageParam,
  position_group,
  country_ids,
  club_ids,
  market_value_max,
  age_max,
}) => {
  try {
    let playerInfoResponses = [];

    let paramsObj = {
      locale: "ES",
      sort_by: "popular",
      page_number: pageParam,
    };

    if (position_group) {
      paramsObj.position_group = position_group;
    }
    if (country_ids) {
      paramsObj.country_ids = country_ids;
    }
    if (club_ids) {
      paramsObj.locale = "DE";
      paramsObj.page_number = 0;
      paramsObj.club_ids = club_ids;
    }
    if (market_value_max && market_value_max !== "") {
      paramsObj.market_value_max = market_value_max;
    }

    if (age_max) {
      paramsObj.age_max = age_max;
    }

    var url = new URL(
      "https://transfermarkt-db.p.rapidapi.com/v1/markets/players-market-value"
    );

    Object.keys(paramsObj).forEach((key) =>
      url.searchParams.append(key, paramsObj[key])
    );

    const response = await fetch(url?.href, {
      headers: {
        "x-rapidapi-key": "9e6def425cmshb53c6cabcf632bep135aa3jsnbc5ac0460ff8",
        "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
      },
    });

    console.log(response);
    const players = await response.json();
    //console.log(players);

    playerInfoResponses = [...players?.data];

    console.log(playerInfoResponses);

    // Extracting player IDs from the response data
    const playerIds = players?.data?.map((player) => player.id) || [];
    const playerIdsInComma = playerIds.join(",");

    const playersShortInfo = await axios().get(
      `/players/short-info?locale=ES&player_ids=${playerIdsInComma}`
    );

    let playerShortInfoList = playersShortInfo?.data?.data || [];
    //console.log(playerShortInfoList);

    playerInfoResponses.forEach((player1) => {
      const matchingPlayer = playerShortInfoList.find(
        (player2) => player2.id === player1.id
      );
      if (matchingPlayer) {
        player1.playerInfo = matchingPlayer;
      }
    });

    //console.log(playerInfoResponses);

    return playerInfoResponses;
  } catch (Error) {
    console.error("Error:", Error);
    throw Error;
  }
};

export const GetCategorywisePlayersDummy = async ({
  pageParam,
  position_group,
  country_ids,
  club_ids,
  market_value_max,
  age_max,
}) => {
  try {
    let playerInfoResponses = [];

    let paramsObj = {
      locale: "ES",
      sort_by: "popular",
      page_number: pageParam,
    };

    if (position_group) {
      paramsObj.position_group = position_group;
    }
    if (country_ids) {
      paramsObj.country_ids = country_ids;
    }
    if (club_ids) {
      paramsObj.club_ids = club_ids;
    }
    if (market_value_max && market_value_max !== "") {
      paramsObj.market_value_max = market_value_max;
    }
    if (age_max) {
      paramsObj.age_max = age_max;
    }

    var url = new URL(
      "http://localhost:5000/api/v1/markets/players-market-value"
    );

    Object.keys(paramsObj).forEach((key) =>
      url.searchParams.append(key, paramsObj[key])
    );

    const response = await fetch(url?.href, {
      headers: {
        "x-rapidapi-key": "be6a7ad5a0msh53ae27cef88c26fp1e1948jsn1ad0128f6c29",
        "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
      },
    });

    const players = await response.json();
    //console.log(players);

    playerInfoResponses = [...players?.data];

    //console.log(playerInfoResponses);

    // Extracting player IDs from the response data
    const playerIds = players?.data?.map((player) => player.id) || [];
    const playerIdsInComma = playerIds.join(",");

    // const playersShortInfo = await axios().get(
    //   `/players/short-info?locale=ES&player_ids=${playerIdsInComma}`
    // );

    // let playerShortInfoList = playersShortInfo?.data?.data || [];
    // console.log(playerShortInfoList);

    // playerInfoResponses.forEach((player1) => {
    //   const matchingPlayer = playerShortInfoList.find(
    //     (player2) => player2.id === player1.id
    //   );
    //   if (matchingPlayer) {
    //     player1.playerInfo = matchingPlayer;
    //   }
    // });

    //console.log(playerInfoResponses);

    return playerInfoResponses;
  } catch (Error) {
    console.error("Error:", Error);
    throw Error;
  }
};

export const GetPlayerProfile = async (id) => {
  const response = await axios().get(
    `/players/profile?locale=ES&player_id=${id}`
  );
  return response?.data;
};
export const GetPlayerProfileDummy = async (id) => {
  let response = new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(playerDetailsDummyResponse);
    }, [1500]);
  });
  return response;
};

export const SearchPlayerData = async (query) => {
  //console.log(query);
  let response = await axios().get(
    `/search/full-search?page_number=0&search_type=players&locale=ES&query=${query}`
  );

  return response?.data;
};

export const SearchPlayerDataDummy = async (id) => {
  let response = new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(dummySearchRes);
    }, [1500]);
  });
  return response;
};

// export const GetCategorywisePlayers = async (params) => {
//   try {
//     let playerInfoResponses = [];

//     const response = await axios().get("/markets/players-market-value", {
//       params,
//     });

//     playerInfoResponses = [...response?.data?.data];
//     console.log(playerInfoResponses);

//     // Extracting player IDs from the response data
//     const playerIds = response?.data?.data?.map((player) => player.id) || [];
//     const playerIdsInComma = playerIds.join(",");

//     const playersShortInfo = await axios().get(
//       `/players/short-info?locale=ES&player_ids=${playerIdsInComma}`
//     );

//     let playerShortInfoList = playersShortInfo?.data?.data || [];
//     console.log(playerShortInfoList);

//     playerInfoResponses.forEach((player1) => {
//       const matchingPlayer = playerShortInfoList.find(
//         (player2) => player2.id === player1.id
//       );
//       if (matchingPlayer) {
//         player1.playerInfo = matchingPlayer;
//       }
//     });

//     console.log(playerInfoResponses);

//     return playerInfoResponses;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };
