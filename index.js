import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, StopCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PronunciationChecker() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [recorder, setRecorder] = useState(null);

  const sentences = [
    "We should ‘finish the ‘project for our ‘history ‘class",
    "‘Peter is re‘vising for his e‘xam ‘next ‘week.",
    "‘Students will ‘spend more ‘time ‘working with ‘other ‘classmates.",
    "I ‘like to ‘watch ‘videos that ‘help me ‘learn ‘new ‘things",
    "I have ‘installed some ‘apps on my ‘phone",
  ];

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setRecorder(mediaRecorder);
    });
  }, []);

  const startRecording = () => {
    if (recorder) {
      recorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setIsRecording(false);
      recorder.ondataavailable = (e) => {
        setAudioURL(URL.createObjectURL(e.data));
        analyzeAudio(e.data);
      };
    }
  };

  const analyzeAudio = async (audioBlob) => {
    // Placeholder function for pronunciation analysis
    setTimeout(() => {
      setFeedback("Your pronunciation score: 85/100. Stress accuracy: 90/100.");
    }, 2000);
  };

  return (
    <div
      className="w-full h-screen bg-cover flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url('/maytinh.png')` }}
    >
      <h1 className="text-3xl font-bold mb-6">Pronunciation Checker</h1>
      <div className="w-3/4 flex flex-col gap-4">
        {sentences.map((sentence, index) => (
          <Card
            key={index}
            className={`p-4 shadow-lg rounded-lg cursor-pointer transition-all ${
              selectedSentence === index ? "border-2 border-blue-400" : ""
            }`}
            onClick={() => setSelectedSentence(index)}
          >
            <CardContent>
              <motion.p
                className="text-lg font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {sentence}
              </motion.p>
              {selectedSentence === index && feedback && (
                <p className="mt-2 text-green-400 font-semibold">{feedback}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <Button onClick={startRecording} disabled={isRecording}>
          <Mic className="mr-2" /> Start Recording
        </Button>
        <Button onClick={stopRecording} disabled={!isRecording}>
          <StopCircle className="mr-2" /> Stop Recording
        </Button>
      </div>
      {audioURL && (
        <audio controls className="mt-4">
          <source src={audioURL} type="audio/wav" />
        </audio>
      )}
    </div>
  );
}
