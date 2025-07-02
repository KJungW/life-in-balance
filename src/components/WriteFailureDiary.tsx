
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import AIFeedback from "@/components/AIFeedback";

interface WriteFailureDiaryProps {
  onBack: () => void;
}

interface DiaryData {
  failureLevel: string;
  failureContent: string;
  failureReason: string;
  feelings: string;
  futurePlan: string;
}

const WriteFailureDiary = ({ onBack }: WriteFailureDiaryProps) => {
  const [diaryData, setDiaryData] = useState<DiaryData>({
    failureLevel: '',
    failureContent: '',
    failureReason: '',
    feelings: '',
    futurePlan: ''
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFeedback(true);
  };

  const isFormValid = Object.values(diaryData).every(value => value.trim() !== '');

  if (showFeedback) {
    return <AIFeedback diaryData={diaryData} onBack={onBack} onWriteNew={() => {
      setDiaryData({
        failureLevel: '',
        failureContent: '',
        failureReason: '',
        feelings: '',
        futurePlan: ''
      });
      setShowFeedback(false);
    }} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>

      <Card className="border-rose-200">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mb-3 mx-auto">
            <Sparkles className="w-6 h-6 text-rose-600" />
          </div>
          <CardTitle className="text-2xl text-rose-700">오늘의 실패 일기</CardTitle>
          <p className="text-gray-600">솔직한 마음으로 오늘의 경험을 기록해보세요</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="failureLevel" className="text-gray-700 font-medium">
                실패 지수 (1-10)
              </Label>
              <Select 
                value={diaryData.failureLevel} 
                onValueChange={(value) => setDiaryData({...diaryData, failureLevel: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="실패의 정도를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}점 {i + 1 <= 3 ? '(가벼운 실패)' : i + 1 <= 6 ? '(보통 실패)' : i + 1 <= 8 ? '(큰 실패)' : '(매우 큰 실패)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="failureContent" className="text-gray-700 font-medium">
                실패 내용
              </Label>
              <Textarea
                id="failureContent"
                placeholder="어떤 실패를 경험하셨나요? 구체적으로 적어주세요."
                value={diaryData.failureContent}
                onChange={(e) => setDiaryData({...diaryData, failureContent: e.target.value})}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="failureReason" className="text-gray-700 font-medium">
                실패 이유
              </Label>
              <Textarea
                id="failureReason"
                placeholder="왜 이런 실패가 일어났다고 생각하시나요?"
                value={diaryData.failureReason}
                onChange={(e) => setDiaryData({...diaryData, failureReason: e.target.value})}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feelings" className="text-gray-700 font-medium">
                느낀 점
              </Label>
              <Textarea
                id="feelings"
                placeholder="이 경험을 통해 무엇을 느끼셨나요?"
                value={diaryData.feelings}
                onChange={(e) => setDiaryData({...diaryData, feelings: e.target.value})}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="futurePlan" className="text-gray-700 font-medium">
                앞으로의 계획
              </Label>
              <Textarea
                id="futurePlan"
                placeholder="앞으로 어떻게 하실 계획인가요?"
                value={diaryData.futurePlan}
                onChange={(e) => setDiaryData({...diaryData, futurePlan: e.target.value})}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              disabled={!isFormValid}
            >
              <Send className="w-4 h-4 mr-2" />
              일기 저장하고 AI 피드백 받기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteFailureDiary;
