import { useState, useRef } from "react";
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

const QUESTIONS = [
  {
    key: "failureReason",
    question: "Q. 혹시 이번에 실패하게 된 이유가 무엇이라고 생각하시나요?",
    placeholder: "실패의 원인을 스스로 생각해보며 적어보세요."
  },
  {
    key: "feelings",
    question: "Q. 이번 경험을 통해 느낀 점이나 감정이 있다면 편하게 말씀해 주세요.",
    placeholder: "이 경험이 당신에게 어떤 감정을 남겼나요? 솔직하게 적어보세요."
  },
  {
    key: "futurePlan",
    question: "Q. 앞으로 비슷한 상황이 온다면 어떻게 해보고 싶으신가요?",
    placeholder: "앞으로 비슷한 상황에서 어떻게 행동할지, 작은 계획이라도 적어보세요."
  }
];

const WriteFailureDiary = ({ onBack }: WriteFailureDiaryProps) => {
  const [diaryData, setDiaryData] = useState<DiaryData>({
    failureLevel: '',
    failureContent: '',
    failureReason: '',
    feelings: '',
    futurePlan: ''
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showAIDialogue, setShowAIDialogue] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [step, setStep] = useState(0);

  // AI 답변 예시 생성 함수 (실패 키워드/내용에 따라 간단히 분기)
  const getAIDialogue = () => {
    const { failureLevel, failureContent } = diaryData;
    return {
      reason: `실패 키워드 "${failureLevel}"와 관련해, 아마도 준비 과정이나 환경적 요인이 영향을 미쳤을 수 있어요. ${failureContent ? '당신의 경험을 통해 많은 것을 배울 수 있을 거예요.' : ''}`,
      feeling: `이런 경험은 누구에게나 힘들 수 있지만, "${failureLevel}"이라는 키워드에서 당신의 솔직함과 성찰이 느껴집니다.`,
      plan: `앞으로 비슷한 상황이 온다면, 이번 경험을 바탕으로 더 나은 선택을 할 수 있을 거예요. 작은 변화부터 시도해보는 건 어떨까요?`
    };
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!showSummary ? (
        <>
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
              <CardTitle className="text-3xl text-slate-200 mb-2">오늘의 일기</CardTitle>
              <p className="text-slate-400 text-lg">솔직한 마음으로 오늘의 경험을 기록해보세요</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-300">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('ko-KR')}</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={e => { e.preventDefault(); setShowAIDialogue(true); setStep(0); }} className="space-y-8">
                {/* 실패 키워드 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full">
                      <Heart className="w-4 h-4 text-rose-200" />
                    </div>
                    <Label htmlFor="failureLevel" className="text-slate-200 font-semibold text-lg">
                      실패를 한마디로 표현한다면?
                    </Label>
                  </div>
                  <Input
                    id="failureLevel"
                    type="text"
                    placeholder="예: 좌절, 성장통, 도전, 아쉬움 등 자유롭게 적어보세요"
                    value={diaryData.failureLevel}
                    maxLength={20}
                    onChange={e => setDiaryData({ ...diaryData, failureLevel: e.target.value })}
                    className="h-12 text-base border-slate-600 focus:border-purple-400 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
                  />
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
                    onChange={e => setDiaryData({ ...diaryData, failureContent: e.target.value })}
                    className="min-h-[120px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500"
                  />
                  {/* 이미지 업로드 */}
                  <div className="mt-2">
                    <Label htmlFor="failureImage" className="text-slate-200 font-semibold text-base mb-1 block">관련 사진 업로드 (선택)</Label>
                    <Input
                      id="failureImage"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setUploadedImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setUploadedImage(null);
                        }
                      }}
                      className="bg-slate-800/80 border-slate-600 text-slate-200 file:bg-indigo-700 file:text-white file:rounded file:px-3 file:py-1 file:border-0"
                    />
                    {uploadedImage && (
                      <div className="mt-3 flex flex-col items-start">
                        <img src={uploadedImage} alt="업로드된 이미지 미리보기" className="max-h-48 rounded-lg border border-slate-600 shadow" />
                        <Button type="button" size="sm" variant="ghost" className="mt-2 text-xs text-red-400 hover:text-red-600" onClick={() => setUploadedImage(null)}>
                          사진 삭제
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {!showAIDialogue && (
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg text-white"
                    disabled={!diaryData.failureLevel.trim() || !diaryData.failureContent.trim()}
                  >
                    <Send className="w-5 h-5 mr-3" />
                    AI와 대화 시작
                  </Button>
                )}
              </form>

              {/* AI 대화 영역 */}
              {showAIDialogue && (
                <div className="mt-10 space-y-8">
                  {/* 이전까지의 대화 내용 모두 출력 */}
                  {QUESTIONS.slice(0, step).map((q, idx) => (
                    <div key={q.key} className="flex flex-col gap-4 mb-2">
                      <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                        <span className="font-semibold">{q.question}</span>
                      </div>
                      <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                        {diaryData[q.key as keyof DiaryData]}
                      </div>
                    </div>
                  ))}
                  {/* 현재 질문과 답변 입력란 */}
                  {step < QUESTIONS.length && (
                    <div className="flex flex-col gap-2 mb-2 items-end">
                      <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                        <span className="font-semibold">{QUESTIONS[step].question}</span>
                      </div>
                      <form className="self-end max-w-[80%] w-full flex items-end gap-2 mt-2" onSubmit={e => {
                        e.preventDefault();
                        if (diaryData[QUESTIONS[step].key as keyof DiaryData].trim()) setStep(step + 1);
                      }}>
                        <Textarea
                          id={QUESTIONS[step].key}
                          placeholder={QUESTIONS[step].placeholder}
                          value={diaryData[QUESTIONS[step].key as keyof DiaryData]}
                          onChange={e => setDiaryData({ ...diaryData, [QUESTIONS[step].key]: e.target.value })}
                          className="min-h-[80px] resize-none text-base border-slate-600 focus:border-purple-400 p-4 bg-slate-800/80 text-slate-200 placeholder:text-slate-500 flex-1"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          className="h-12 w-12 bg-indigo-700 text-white hover:bg-indigo-800 ml-2"
                          disabled={!diaryData[QUESTIONS[step].key as keyof DiaryData].trim()}
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </form>
                    </div>
                  )}
                  {/* 대화 종료 버튼: 항상 하단에 표시 */}
                  <div className="flex justify-end mt-8">
                    <Button
                      variant="outline"
                      className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                      onClick={() => { setShowAIDialogue(false); setShowSummary(true); }}
                    >
                      대화 종료
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="bg-slate-800/90 rounded-2xl shadow-2xl p-10 space-y-6 border border-slate-600 max-w-lg w-full mx-4">
            <h2 className="text-3xl font-bold text-purple-200 mb-6 text-center">오늘의 일기</h2>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-slate-300">실패를 한마디로 표현한다면?</span>
                <div className="mt-1 text-lg text-slate-100 bg-slate-700/60 rounded px-4 py-2">{diaryData.failureLevel}</div>
              </div>
              <div>
                <span className="font-semibold text-slate-300">실패 내용</span>
                <div className="mt-1 text-slate-100 bg-slate-700/60 rounded px-4 py-2">{diaryData.failureContent}</div>
              </div>
              {/* 업로드된 이미지가 있으면 요약에 표시 */}
              {uploadedImage && (
                <div>
                  <span className="font-semibold text-slate-300">관련 사진</span>
                  <div className="mt-1 flex justify-center">
                    <img src={uploadedImage} alt="업로드된 사진" className="max-h-60 rounded-lg border border-slate-600 shadow" />
                  </div>
                </div>
              )}
              <div>
                <span className="font-semibold text-indigo-300">실패 이유</span>
                <div className="mt-1 text-indigo-100 bg-indigo-900/40 rounded px-4 py-2">
                  실패한 이유는 사전에 준비가 약간 부족했기 때문입니다!
                </div>
              </div>
              <div>
                <span className="font-semibold text-indigo-300">느낀 점</span>
                <div className="mt-1 text-indigo-100 bg-indigo-900/40 rounded px-4 py-2">
                  이번 경험을 통해 사전준비의 중요성을 배울 수 있었습니다!
                </div>
              </div>
              <div>
                <span className="font-semibold text-indigo-300">앞으로의 계획</span>
                <div className="mt-1 text-indigo-100 bg-indigo-900/40 rounded px-4 py-2">
                  사전 준비를 하고 더블체크를 통해 빠드린것이 없는지 한번더 확인해볼 예정입니다
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="text-center text-lg text-purple-200 font-semibold">
                실패는 성장의 밑거름이에요! 오늘의 경험이 내일의 더 나은 당신을 만듭니다. 힘내세요!
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                  onClick={onBack}
                >
                  처음으로
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteFailureDiary;
