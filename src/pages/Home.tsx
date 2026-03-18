import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { supabase } from "../services/supabase";

function Home() {
  const [news, setNews] = useState("");
  const [result, setResult] = useState("");

  const analyzeNews = async () => {
    setResult("Checking...");

    const { data, error } =
      await supabase.functions.invoke(
        "analyze-news",
        {
          body: { text: news },
        }
      );

    if (error) {
      setResult("Error");
    } else {
      setResult(data.result);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-lg w-[500px]">

          <h2 className="text-xl font-semibold mb-4 text-center">
            Check News
          </h2>

          <textarea
            className="w-full border p-2 rounded"
            rows={5}
            placeholder="Paste news here"
            value={news}
            onChange={(e) =>
              setNews(e.target.value)
            }
          />

          <button
            onClick={analyzeNews}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Analyze News
          </button>

          <div className="mt-4 text-center">

            <span className="text-lg font-bold">
              Result:
            </span>

            <span
              className={`ml-2 px-3 py-1 rounded text-white ${
                result.includes("Fake")
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {result}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;