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
    question: "Q. 누구나 실수할 수 있어요. 이번에 힘들었던 이유나 상황을 편하게 이야기해주실 수 있나요?",
    placeholder: "실패의 원인을 스스로 생각해보며 적어보세요. 당신의 이야기를 충분히 공감하며 듣고 있어요."
  },
  {
    key: "feelings",
    question: "Q. 이런 경험은 누구에게나 힘들 수 있죠. 그 과정에서 느꼈던 감정이나 생각을 자유롭게 나눠주세요. 저는 당신의 마음을 이해하고 싶어요.",
    placeholder: "이 경험이 당신에게 어떤 감정을 남겼나요? 솔직하게 적어주셔도 괜찮아요."
  },
  {
    key: "futurePlan",
    question: "Q. 이번 경험이 분명히 성장의 밑거름이 될 거예요. 앞으로 비슷한 상황이 온다면, 어떤 점을 다르게 해보고 싶으신가요? 작은 변화도 괜찮아요.",
    placeholder: "앞으로 비슷한 상황에서 어떻게 행동할지, 작은 계획이라도 적어보세요. 당신의 용기를 응원합니다."
  }
];

// 하드코딩된 요약 값
const HARDCODED_SUMMARY = {
  failureLevel: "준비는 충분했지만, 순간의 긴장에는 익숙하지 않았다",
  failureContent: "회사 발표 중 질의응답 시간에 예상치 못한 질문을 받고 당황해 아무런 대답도 하지 못했다",
  failureReason: "발표 자체는 충분히 준비했지만, 돌발 상황에 대한 시뮬레이션과 공식적인 자리에서의 발표 경험이 부족했다",
  feelings: "실패가 꼭 준비 부족 때문만은 아니라는 걸 처음 느꼈다. 완벽하려는 마음이 오히려 스스로를 더 긴장하게 만들었고, 그동안의 노력까지 부정하게 만들었다. 그 순간을 지나고 나니, 나 자신에게 너무 가혹했단 생각이 들었다.",
  futurePlan: "앞으로는 돌발 질문 대응력을 기르기 위해 발표 연습 시 가상의 질문을 받아보며 연습할 계획이다. 또한, 예상치 못한 상황에서도 당황하지 않도록 말문을 여는 문장을 미리 준비해두고, 긴장을 조절하는 루틴도 만들어보려 한다."
};

// Helper for auto-resize
function autoResizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 'px';
}

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
  const [aiType, setAIType] = useState<'none' | 'empathy' | 'problem'>('none');

  // AI 답변 예시 생성 함수 (실패 키워드/내용에 따라 간단히 분기)
  const getAIDialogue = () => {
    const { failureLevel, failureContent } = diaryData;
    return {
      reason: `실패 키워드 "${failureLevel}"와 관련해, 아마도 준비 과정이나 환경적 요인이 영향을 미쳤을 수 있어요. ${failureContent ? '당신의 경험을 통해 많은 것을 배울 수 있을 거예요.' : ''}`,
      feeling: `이런 경험은 누구에게나 힘들 수 있지만, "${failureLevel}"이라는 키워드에서 당신의 솔직함과 성찰이 느껴집니다.`,
      plan: `앞으로 비슷한 상황이 온다면, 이번 경험을 바탕으로 더 나은 선택을 할 수 있을 거예요. 작은 변화부터 시도해보는 건 어떨까요?`
    };
  };

  // showSummary가 true가 되는 순간 diaryData를 하드코딩 값으로 덮어쓰기
  if (showSummary && (diaryData.failureLevel !== HARDCODED_SUMMARY.failureLevel)) {
    setTimeout(() => setDiaryData(HARDCODED_SUMMARY), 0);
  }

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
                    onChange={e => { setDiaryData({ ...diaryData, failureContent: e.target.value }); autoResizeTextarea(e as any); }}
                    onInput={autoResizeTextarea}
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
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg text-white"
                      disabled={!diaryData.failureLevel.trim() || !diaryData.failureContent.trim()}
                      onClick={e => { e.preventDefault(); setShowAIDialogue(true); setStep(0); setAIType('empathy'); }}
                    >
                      <Send className="w-5 h-5 mr-3" />
                      공감형 AI와 대화 시작
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg text-white"
                      disabled={!diaryData.failureLevel.trim() || !diaryData.failureContent.trim()}
                      onClick={e => { e.preventDefault(); setShowAIDialogue(true); setStep(0); setAIType('problem'); }}
                    >
                      <Send className="w-5 h-5 mr-3" />
                      문제해결형 AI와 대화 시작
                    </Button>
                  </div>
                )}
              </form>

              {/* AI 대화 영역 */}
              {showAIDialogue && (
                <div className="mt-10 space-y-8">
                  {aiType === 'empathy' ? (
                    // 하드코딩된 공감형 대화
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그때 발표 자리에서 어떤 일이 있었나요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          질문을 받았는데 너무 긴장해서 아무 말도 못 했어요. 머릿속이 하얘졌어요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그 순간, 마음이 많이 복잡했을 것 같아요.<br/>제일 먼저 들었던 감정은 어떤 거였나요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          창피함이요. 실망스럽고…
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그 마음, 정말 이해돼요.<br/>그때의 나에게 짧게 한마디 해준다면 뭐라고 말하고 싶으세요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          "괜찮아. 그 정도면 잘했어."
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그 말, 지금의 나에게도 꼭 필요한 말일지 몰라요.<br/>지금 돌아보면, 그 일은 당신에게 어떤 의미였던 것 같나요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          실패라기보다는… 멈춰서 배운 시간이었던 것 같아요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그렇게 바라봐 주셔서 정말 멋져요.<br/>오늘 이 대화가 당신 마음에 조금이나마 따뜻함으로 남기를 바라요. 🌿
                        </div>
                      </div>
                      <div className="flex justify-end mt-8">
                        <Button
                          variant="outline"
                          className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                          onClick={() => { setShowAIDialogue(false); setShowSummary(true); setAIType('none'); }}
                        >
                          대화 종료
                        </Button>
                      </div>
                    </div>
                  ) : aiType === 'problem' ? (
                    // 하드코딩된 문제해결형 대화
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          발표에서 무슨 일이 있었나요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          질문을 받았는데 머릿속이 하얘져서 아무 말도 못했어요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          정말 당황스러우셨겠어요. 준비를 열심히 했던 만큼 더 아쉬움이 컸을 것 같아요.<br/>혹시 비슷한 상황이 처음이셨을까요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          네, 공식적인 자리에서 그런 경험은 처음이었어요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          처음이라면 누구든지 겪을 수 있는 일이에요.<br/>혹시 다음엔 비슷한 상황을 더 잘 넘기기 위해 시도해보고 싶은 방법이 있을까요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          음… 갑자기 질문받는 연습을 좀 더 해볼까 싶긴 해요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          좋은 생각이에요!<br/>제가 제안드려도 괜찮다면, 이런 방법들이 있을 것 같아요:<br/><br/>모의 발표 중 돌발 질문 연습하기<br/>중간에 멈추고 다시 말하는 습관 기르기<br/>"잘 모르겠습니다"를 침착하게 말하는 문장 미리 준비해두기<br/><br/>혹시 이 중에서 바로 시도해볼 수 있는 게 있을까요?
                        </div>
                        <div className="self-end max-w-[80%] bg-slate-800/90 text-slate-200 rounded-xl px-5 py-3 shadow">
                          세 번째 방법이 괜찮을 것 같아요. 당황했을 때 말문을 여는 연습부터 해보고 싶어요.
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mb-2">
                        <div className="self-start max-w-[80%] bg-blue-900/80 text-white rounded-xl px-5 py-3 shadow">
                          그 선택 정말 좋아요.<br/>예를 들어 "그 질문은 정말 중요한 포인트네요. 조금 더 생각해봐야 할 것 같아요." 같은 문장을 미리 연습해보는 거죠.<br/>혹시 이번 주 안에 작은 연습 목표를 하나 잡아볼까요?
                        </div>
                      </div>
                      <div className="flex justify-end mt-8">
                        <Button
                          variant="outline"
                          className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                          onClick={() => { setShowAIDialogue(false); setShowSummary(true); setAIType('none'); }}
                        >
                          대화 종료
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // 기존 문제해결형/기타 대화 로직
                    <>
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
                          onClick={() => { setShowAIDialogue(false); setShowSummary(true); setAIType('none'); }}
                        >
                          대화 종료
                        </Button>
                      </div>
                    </>
                  )}
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
                <Input
                  className="mt-1 text-lg text-slate-100 bg-slate-700/60 rounded px-4 py-2 border-none focus:ring-2 focus:ring-purple-400"
                  value={diaryData.failureLevel}
                  onChange={e => setDiaryData({ ...diaryData, failureLevel: e.target.value })}
                  maxLength={20}
                />
              </div>
              <div>
                <span className="font-semibold text-slate-300">실패 내용</span>
                <Textarea
                  className="mt-1 text-slate-100 bg-slate-700/60 rounded px-4 py-2 border-none focus:ring-2 focus:ring-purple-400 min-h-[60px] resize-none overflow-hidden"
                  value={diaryData.failureContent}
                  onChange={e => { setDiaryData({ ...diaryData, failureContent: e.target.value }); autoResizeTextarea(e as any); }}
                  onInput={autoResizeTextarea}
                />
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
                <Textarea
                  className="w-full text-indigo-100 bg-indigo-900/40 rounded border-none focus:ring-2 focus:ring-indigo-400 resize-none overflow-hidden"
                  value={diaryData.failureReason}
                  onChange={e => { setDiaryData({ ...diaryData, failureReason: e.target.value }); autoResizeTextarea(e as any); }}
                  onInput={autoResizeTextarea}
                  style={{height: 'auto'}}
                />
              </div>
              <div>
                <span className="font-semibold text-indigo-300">느낀 점</span>
                <Textarea
                  className="w-full text-indigo-100 bg-indigo-900/40 rounded border-none focus:ring-2 focus:ring-indigo-400 resize-none overflow-hidden"
                  value={diaryData.feelings}
                  onChange={e => { setDiaryData({ ...diaryData, feelings: e.target.value }); autoResizeTextarea(e as any); }}
                  onInput={autoResizeTextarea}
                  style={{height: 'auto'}}
                />
              </div>
              <div>
                <span className="font-semibold text-indigo-300">앞으로의 계획</span>
                <Textarea
                  className="w-full text-indigo-100 bg-indigo-900/40 rounded border-none focus:ring-2 focus:ring-indigo-400 resize-none overflow-hidden"
                  value={diaryData.futurePlan}
                  onChange={e => { setDiaryData({ ...diaryData, futurePlan: e.target.value }); autoResizeTextarea(e as any); }}
                  onInput={autoResizeTextarea}
                  style={{height: 'auto'}}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="text-center text-lg text-purple-200 font-semibold">
                실패는 성장의 밑거름이에요! 오늘의 경험이 내일의 더 나은 당신을 만듭니다. 힘내세요!
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                  onClick={() => setShowSummary(false)}
                >
                  대화로 되돌아가기
                </Button>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={onBack}
                >
                  저장
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
