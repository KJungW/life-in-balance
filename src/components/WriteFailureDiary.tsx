
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Sparkles, Heart, Brain, Target, Calendar } from "lucide-react";
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
    <div className="max-w-3xl mx-auto">
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

      <Card className="border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-4 mx-auto">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <CardTitle className="text-3xl text-purple-700 mb-2">오늘의 실패 일기</CardTitle>
          <p className="text-gray-600 text-lg">솔직한 마음으로 오늘의 경험을 기록해보세요</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-purple-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('ko-KR')}</span>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 실패 지수 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-100 to-orange-100 rounded-full">
                  <Heart className="w-4 h-4 text-red-600" />
                </div>
                <Label htmlFor="failureLevel" className="text-gray-700 font-semibold text-lg">
                  실패 지수 (1-10)
                </Label>
              </div>
              <Select 
                value={diaryData.failureLevel} 
                onValueChange={(value) => setDiaryData({...diaryData, failureLevel: value})}
              >
                <SelectTrigger className="h-12 text-base border-purple-200 focus:border-purple-400">
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

            {/* 실패 내용 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <Label htmlFor="failureContent" className="text-gray-700 font-semibold text-lg">
                  실패 내용
                </Label>
              </div>
              <Textarea
                id="failureContent"
                placeholder="어떤 실패를 경험하셨나요? 구체적으로 적어주세요."
                value={diaryData.failureContent}
                onChange={(e) => setDiaryData({...diaryData, failureContent: e.target.value})}
                className="min-h-[120px] resize-none text-base border-purple-200 focus:border-purple-400 p-4"
              />
            </div>

            {/* 실패 이유 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                  <Brain className="w-4 h-4 text-amber-600" />
                </div>
                <Label htmlFor="failureReason" className="text-gray-700 font-semibold text-lg">
                  실패 이유
                </Label>
              </div>
              <Textarea
                id="failureReason"
                placeholder="왜 이런 실패가 일어났다고 생각하시나요?"
                value={diaryData.failureReason}
                onChange={(e) => setDiaryData({...diaryData, failureReason: e.target.value})}
                className="min-h-[120px] resize-none text-base border-purple-200 focus:border-purple-400 p-4"
              />
            </div>

            {/* 느낀 점 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <Label htmlFor="feelings" className="text-gray-700 font-semibold text-lg">
                  느낀 점
                </Label>
              </div>
              <Textarea
                id="feelings"
                placeholder="이 경험을 통해 무엇을 느끼셨나요?"
                value={diaryData.feelings}
                onChange={(e) => setDiaryData({...diaryData, feelings: e.target.value})}
                className="min-h-[120px] resize-none text-base border-purple-200 focus:border-purple-400 p-4"
              />
            </div>

            {/* 앞으로의 계획 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <Label htmlFor="futurePlan" className="text-gray-700 font-semibold text-lg">
                  앞으로의 계획
                </Label>
              </div>
              <Textarea
                id="futurePlan"
                placeholder="앞으로 어떻게 하실 계획인가요?"
                value={diaryData.futurePlan}
                onChange={(e) => setDiaryData({...diaryData, futurePlan: e.target.value})}
                className="min-h-[120px] resize-none text-base border-purple-200 focus:border-purple-400 p-4"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg"
              disabled={!isFormValid}
            >
              <Send className="w-5 h-5 mr-3" />
              일기 저장하고 AI 피드백 받기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WriteFailureDiary;
