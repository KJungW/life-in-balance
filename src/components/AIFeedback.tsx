
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Heart, Lightbulb, Target } from "lucide-react";

interface DiaryData {
  failureLevel: string;
  failureContent: string;
  failureReason: string;
  feelings: string;
  futurePlan: string;
}

interface AIFeedbackProps {
  diaryData: DiaryData;
  onBack: () => void;
  onWriteNew: () => void;
}

const AIFeedback = ({ diaryData, onBack, onWriteNew }: AIFeedbackProps) => {
  // 미리 정의된 AI 응답 (프로토타입용)
  const getComfortMessage = () => {
    const level = parseInt(diaryData.failureLevel);
    if (level >= 8) {
      return "정말 힘든 시간을 보내셨을 것 같아요. 하지만 이런 큰 실패를 경험하신 것 자체가 용기 있는 도전을 하셨다는 증거입니다. 지금은 아프지만, 이 경험이 분명 더 강한 당신을 만들어줄 거예요.";
    } else if (level >= 5) {
      return "속상하셨을 거예요. 실패는 누구에게나 찾아오는 경험이에요. 중요한 건 실패 자체가 아니라 그것을 어떻게 받아들이고 다음 단계로 나아가느냐입니다. 지금 이렇게 돌아보고 계시는 것만으로도 충분히 성장하고 계세요.";
    } else {
      return "작은 실패도 소중한 경험이에요. 이런 작은 실수들이 쌓여서 더 큰 실패를 예방하게 되거든요. 지금처럼 꼼꼼히 돌아보는 습관이 정말 좋습니다.";
    }
  };

  const getComfortTitle = () => {
    const level = parseInt(diaryData.failureLevel);
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
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          홈으로 돌아가기
        </Button>
      </div>

      <div className="space-y-6">
        {/* 위로 메시지 */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-purple-700 text-xl">{getComfortTitle()}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              {getComfortMessage()}
            </p>
          </CardContent>
        </Card>

        {/* 분석 피드백 */}
        <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
              </div>
              <CardTitle className="text-indigo-700 text-xl">실패 분석</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              {getAnalysis()}
            </p>
          </CardContent>
        </Card>

        {/* 발전 방향 제안 */}
        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                <Target className="w-5 h-5 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-700 text-xl">발전 방향</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">
              {getSuggestion()}
            </p>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex gap-4">
          <Button 
            onClick={onWriteNew}
            className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg"
          >
            <Edit className="w-5 h-5 mr-2" />
            새 일기 작성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;
