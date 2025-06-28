/**
 * @param {Object} data User data to save
 * @returns {Promise<Object>} Response from the API
 */
export const saveUserData = async (data) => {
  const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  if (!APPS_SCRIPT_URL) {
    console.error(
      "APPS_SCRIPT_URL environment variable is not defined"
    );
    return Promise.reject(
      new Error("Google Apps Script URL is not configured")
    );
  }

  return new Promise((resolve, reject) => {
    try {
      console.log("Saving data to:", APPS_SCRIPT_URL);
      console.log("Data to save:", data);

      if (!data.submittedAt) {
        data.submittedAt = new Date().toISOString();
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = APPS_SCRIPT_URL;
      form.style.display = "none";

      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe_" + Date.now();
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      form.target = iframe.name;

      const actionField = document.createElement("input");
      actionField.name = "action";
      actionField.value = "saveData";
      form.appendChild(actionField);

      const dataField = document.createElement("input");
      dataField.name = "data";
      dataField.value = JSON.stringify(data);
      form.appendChild(dataField);

      document.body.appendChild(form);

      form.submit();

      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 1000);

      resolve({
        status: "success",
        message: "Form submitted to Google Sheet.",
      });
    } catch (error) {
      console.error("Error saving user data:", error);
      reject(error);
    }
  });
};
