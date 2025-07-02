
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
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
      </div>

      <Card className="border-slate-600 shadow-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-4 mx-auto">
            <Sparkles className="w-8 h-8 text-purple-200" />
          </div>
          <CardTitle className="text-3xl text-slate-200 mb-2">오늘의 실패 일기</CardTitle>
          <p className="text-slate-400 text-lg">솔직한 마음으로 오늘의 경험을 기록해보세요</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-300">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('ko-KR')}</span>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 실패 지수 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full">
                  <Heart className="w-4 h-4 text-rose-200" />
                </div>
                <Label htmlFor="failureLevel" className="text-slate-200 font-semibold text-lg">
                  실패 지수 (1-10)
                </Label>
              </div>
              <Select 
                value={diaryData.failureLevel} 
                onValueChange={(value) => setDiaryData({...diaryData, failureLevel: value})}
              >
                <SelectTrigger className="h-12 text-base border-slate-600 focus:border-purple-400 bg-slate-800/80 text-slate-200">
                  <SelectValue placeholder="실패의 정도를 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()} className="text-slate-200 focus:bg-slate-700">
                      {i + 1}점 {i + 1 <= 3 ? '(가벼운 실패)' : i + 1 <= 6 ? '(보통 실패)' : i + 1 <= 8 ? '(큰 실패)' : '(매우 큰 실패)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 실패 내용 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full">
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                </div>
                <Label htmlFor="failureContent" className="text-slate-200 font-semibold text-lg">
                  실패 내용
                </Label>
              </div>
              <Textarea
                id="failureContent"
                placeholder="어떤 실패를 경험하셨나요? 구체적으로 적어주세요."
                value={diaryData.failureContent}
                onChange={(e) => setDiaryData({...diaryData, failureContent: e.target.value})}
                className="min-h-[120px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
              />
            </div>

            {/* 실패 이유 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full">
                  <Brain className="w-4 h-4 text-amber-200" />
                </div>
                <Label htmlFor="failureReason" className="text-slate-200 font-semibold text-lg">
                  실패 이유
                </Label>
              </div>
              <Textarea
                id="failureReason"
                placeholder="왜 이런 실패가 일어났다고 생각하시나요?"
                value={diaryData.failureReason}
                onChange={(e) => setDiaryData({...diaryData, failureReason: e.target.value})}
                className="min-h-[120px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
              />
            </div>

            {/* 느낀 점 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full">
                  <Heart className="w-4 h-4 text-pink-200" />
                </div>
                <Label htmlFor="feelings" className="text-slate-200 font-semibold text-lg">
                  느낀 점
                </Label>
              </div>
              <Textarea
                id="feelings"
                placeholder="이 경험을 통해 무엇을 느끼셨나요?"
                value={diaryData.feelings}
                onChange={(e) => setDiaryData({...diaryData, feelings: e.target.value})}
                className="min-h-[120px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
              />
            </div>

            {/* 앞으로의 계획 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full">
                  <Target className="w-4 h-4 text-emerald-200" />
                </div>
                <Label htmlFor="futurePlan" className="text-slate-200 font-semibold text-lg">
                  앞으로의 계획
                </Label>
              </div>
              <Textarea
                id="futurePlan"
                placeholder="앞으로 어떻게 하실 계획인가요?"
                value={diaryData.futurePlan}
                onChange={(e) => setDiaryData({...diaryData, futurePlan: e.target.value})}
                className="min-h-[120px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg text-white"
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
