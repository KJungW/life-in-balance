import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Heart, Lightbulb, Target } from "lucide-react";
import { useState } from "react";

interface DiaryData {
  id: number;
  date: Date;
  failureLevel: string;
  failureContent: string;
  failureReason: string;
  feelings: string;
  futurePlan: string;
}

interface ViewDiaryByDateProps {
  diary: DiaryData;
  onBack: () => void;
}

const ViewDiaryByDate = ({ diary, onBack }: ViewDiaryByDateProps) => {
  const HARDCODED_DIARY = {
    ...diary,
    failureContent: "회사 발표 중 질의응답 시간에 예상치 못한 질문을 받고 당황해 아무런 대답도 하지 못했다",
    failureReason: "발표 자체는 충분히 준비했지만, 돌발 상황에 대한 시뮬레이션과 공식적인 자리에서의 발표 경험이 부족했다",
    feelings: "실패가 꼭 준비 부족 때문만은 아니라는 걸 처음 느꼈다. 완벽하려는 마음이 오히려 스스로를 더 긴장하게 만들었고, 그동안의 노력까지 부정하게 만들었다. 그 순간을 지나고 나니, 나 자신에게 너무 가혹했단 생각이 들었다.",
    futurePlan: "앞으로는 돌발 질문 대응력을 기르기 위해 발표 연습 시 가상의 질문을 받아보며 연습할 계획이다. 또한, 예상치 못한 상황에서도 당황하지 않도록 말문을 여는 문장을 미리 준비해두고, 긴장을 조절하는 루틴도 만들어보려 한다."
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...HARDCODED_DIARY });
  const [displayData, setDisplayData] = useState({ ...HARDCODED_DIARY });

  // AI 피드백 생성 함수들
  const getComfortMessage = () => {
    const level = parseInt(diary.failureLevel);
    if (level >= 8) {
      return "정말 힘든 시간을 보내셨을 것 같아요. 하지만 이런 큰 실패를 경험하신 것 자체가 용기 있는 도전을 하셨다는 증거입니다. 지금은 아프지만, 이 경험이 분명 더 강한 당신을 만들어줄 거예요.";
    } else if (level >= 5) {
      return "속상하셨을 거예요. 실패는 누구에게나 찾아오는 경험이에요. 중요한 건 실패 자체가 아니라 그것을 어떻게 받아들이고 다음 단계로 나아가느냐입니다. 지금 이렇게 돌아보고 계시는 것만으로도 충분히 성장하고 계세요.";
    } else {
      return "작은 실패도 소중한 경험이에요. 이런 작은 실수들이 쌓여서 더 큰 실패를 예방하게 되거든요. 지금처럼 꼼꼼히 돌아보는 습관이 정말 좋습니다.";
    }
  };

  const getComfortTitle = () => {
    const level = parseInt(diary.failureLevel);
    const titles = [
      "괜찮아요!", "힘내요!", "잘하고 있어요!", "괜찮습니다!", 
      "괜찮을 거예요!", "힘내세요!", "괜찮아!", "잘했어요!",
      "모든 게 다 괜찮아질 거예요!", "힘을 내요!"
    ];
    
    if (level >= 8) {
      return ["모든 게 다 괜찮아질 거예요!", "힘을 내요!", "괜찮을 거예요!"][Math.floor(Math.random() * 3)];
    } else if (level >= 5) {
      return ["괜찮아요!", "힘내요!", "잘하고 있어요!"][Math.floor(Math.random() * 3)];
    } else {
      return ["잘했어요!", "괜찮아!", "힘내세요!"][Math.floor(Math.random() * 3)];
    }
  };

  const getAnalysis = () => {
    return "당신이 적어주신 실패 이유를 보니, 스스로를 잘 객관화하고 계시는 것 같아요. 이런 자기 성찰 능력이야말로 성장의 첫걸음입니다. 실패의 원인을 파악했다는 것은 이미 절반은 해결한 셈이에요.";
  };

  const getSuggestion = () => {
    return "앞으로의 계획도 구체적으로 세우셨네요. 계획을 실행할 때는 너무 완벽하려고 하지 마시고, 작은 단계부터 차근차근 시작해보세요. 실패를 두려워하지 않는 마음가짐이 가장 중요해요. 당신은 이미 그 용기를 가지고 계시니까요.";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-slate-300 hover:text-slate-100 hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
        {!isEditing && (
          <Button
            variant="outline"
            className="ml-auto border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
            onClick={() => setIsEditing(true)}
          >
            수정
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* 일기 정보 */}
        <Card className="border-slate-600 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {displayData.date.toLocaleDateString('ko-KR')}
              </span>
            </div>
            <CardTitle className="text-xl text-slate-200 mt-3">
              {isEditing ? (
                <input
                  className="w-full bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={editData.failureLevel}
                  onChange={e => setEditData({ ...editData, failureLevel: e.target.value })}
                />
              ) : (
                displayData.failureLevel
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-200 mb-2">실패 내용</h3>
              {isEditing ? (
                <textarea
                  className="w-full bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[60px] resize-none overflow-hidden"
                  value={editData.failureContent}
                  onChange={e => setEditData({ ...editData, failureContent: e.target.value })}
                />
              ) : (
                <p className="leading-relaxed">{displayData.failureContent}</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 mb-2">실패 이유</h3>
              {isEditing ? (
                <textarea
                  className="w-full bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[40px] resize-none overflow-hidden"
                  value={editData.failureReason}
                  onChange={e => setEditData({ ...editData, failureReason: e.target.value })}
                />
              ) : (
                <p className="leading-relaxed">{displayData.failureReason}</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 mb-2">느낀 점</h3>
              {isEditing ? (
                <textarea
                  className="w-full bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[40px] resize-none overflow-hidden"
                  value={editData.feelings}
                  onChange={e => setEditData({ ...editData, feelings: e.target.value })}
                />
              ) : (
                <p className="leading-relaxed">{displayData.feelings}</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-200 mb-2">앞으로의 계획</h3>
              {isEditing ? (
                <textarea
                  className="w-full bg-slate-800 text-slate-200 rounded px-2 py-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[40px] resize-none overflow-hidden"
                  value={editData.futurePlan}
                  onChange={e => setEditData({ ...editData, futurePlan: e.target.value })}
                />
              ) : (
                <p className="leading-relaxed">{displayData.futurePlan}</p>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-3 justify-end pt-2">
                <Button
                  variant="outline"
                  className="border-slate-500 text-slate-300 bg-slate-800 hover:bg-slate-700"
                  onClick={() => { setIsEditing(false); setEditData(displayData); }}
                >
                  취소
                </Button>
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  onClick={() => { setDisplayData({ ...editData }); setIsEditing(false); }}
                >
                  저장
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* 하단 응원글 섹션 */}
      <div className="mt-10">
        <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 rounded-2xl p-6 shadow-xl border border-purple-700">
          <h3 className="text-lg font-bold text-purple-200 mb-4">다른 사람이 남긴 응원글</h3>
          <ul className="space-y-3">
            <li className="bg-slate-800/80 rounded-lg px-4 py-3 text-slate-200">
              "실패는 누구에게나 찾아와요. 오늘의 용기가 내일의 성장으로 이어질 거예요! 힘내세요!" <span className="text-xs text-slate-400 ml-2">- 익명의 응원자</span>
            </li>
            <li className="bg-slate-800/80 rounded-lg px-4 py-3 text-slate-200">
              "이런 경험을 공유해줘서 고마워요. 당신의 이야기가 큰 힘이 됩니다." <span className="text-xs text-slate-400 ml-2">- 공감하는 친구</span>
            </li>
            <li className="bg-slate-800/80 rounded-lg px-4 py-3 text-slate-200">
              "실패를 기록하는 것 자체가 이미 멋진 도전이에요. 앞으로도 응원할게요!" <span className="text-xs text-slate-400 ml-2">- 응원단</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewDiaryByDate;
