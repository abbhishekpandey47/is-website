"use client";

const GITHUB_CONFIG = {
  owner: "kolhesatish",
  repo: "Infrasity-user-data",
  path: "user-data.json",
  token: process.env.NEXT_PUBLIC_DATA,
};

/**
 * @returns {Promise<Array>}
 */
export const getUserData = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`,
      {
        headers: {
          Authorization: `token ${GITHUB_CONFIG.token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    const contentDecoded = atob(data.content);
    return JSON.parse(contentDecoded);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
};

/**
 * Saves user data to GitHub repository
 * @param {Object} data
 * @returns {Promise<Array>}
 */
export const saveUserData = async (data) => {
  try {
    let currentData = [];
    let sha = null;

    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`,
        {
          headers: {
            Authorization: `token ${GITHUB_CONFIG.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (response.ok) {
        const fileData = await response.json();
        sha = fileData.sha;
        const contentDecoded = atob(fileData.content);
        currentData = JSON.parse(contentDecoded);
      }
    } catch (error) {
      console.log("Creating new file for user data");
    }

    const updatedData = [...currentData, data];

    const content = btoa(JSON.stringify(updatedData, null, 2));

    const requestBody = {
      message: "Update user data",
      content,
      ...(sha && { sha }),
    };

    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${GITHUB_CONFIG.token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!updateResponse.ok) {
      throw new Error(`Failed to save data: ${updateResponse.status}`);
    }

    return updatedData;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

// export const exampleUser = {
//   email: "example@domain.com",
//   budget: "$5000-$10000",
//   blogPosts: "10-20",
//   trafficGrowth: "50%+",
//   contentTeam: "1-2 people",
//   domainExpertise: "Intermediate",
//   timeline: "3-6 months",
//   submittedAt: "2025-04-30T15:30:45.123Z",
// };
