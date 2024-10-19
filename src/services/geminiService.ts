import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDCO3usa2dJc42Mt6eEuaCmhM-5NmRqKI0";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateTravelPlan(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API çağrısı sırasında hata oluştu:", error);
    throw new Error("Seyahat planı oluşturulurken bir hata meydana geldi. Lütfen daha sonra tekrar deneyin.");
  }
}