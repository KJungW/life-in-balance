import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw, Eye, Calendar } from "lucide-react";

interface ViewOthersDiaryProps {
  onBack: () => void;
}

interface OtherDiary {
  id: number;
  author: string;
  date: string;
  failureLevel: number;
  title: string;
  content: string;
  reason: string;
  feelings: string;
  plan: string;
  emotion: string;
}

const ViewOthersDiary = ({ onBack }: ViewOthersDiaryProps) => {
  // 미리 정의된 다른 사람들의 일기 (프로토타입용)
  const sampleDiaries: OtherDiary[] = [
    {
      id: 1,
      author: "정도윤",
      date: "2024.01.15",
      failureLevel: 7,
      title: "신입 개발자의 첫 배포 실패",
      emotion: '😭',
      content: "오늘 처음으로 실제 서비스에 코드를 배포했는데, 버그가 있어서 30분 동안 서비스가 다운되었습니다. 팀장님과 동료들에게 정말 죄송했고, 사용자들에게도 불편을 끼쳤어요.",
      reason: "코드 리뷰를 받았지만, 엣지 케이스를 고려하지 못했고 테스트도 충분히 하지 않았습니다. 급하게 배포하려는 마음에 꼼꼼히 검토하지 못한 것 같아요.",
      feelings: "정말 창피하고 죄송했습니다. 하지만 팀원들이 따뜻하게 격려해주셔서 다시 일어날 수 있었어요. 실수는 누구나 할 수 있다는 것도 깨달았습니다.",
      plan: "앞으로 배포 전에는 반드시 체크리스트를 만들어서 확인하고, 테스트 케이스를 더 꼼꼼히 작성하겠습니다. 그리고 급할 때일수록 천천히 검토하는 습관을 기르겠어요."
    },
    {
      id: 2,
      author: "윤대한",
      date: "2024.01.20",
      failureLevel: 9,
      title: "면접에서 멘탈이 무너진 날",
      emotion: '😔',
      content: "정말 가고 싶었던 회사의 최종 면접에서 완전히 패닉이 왔습니다. 준비했던 것들이 머릿속에서 하나도 생각나지 않았고, 면접관 앞에서 말을 제대로 하지 못했어요.",
      reason: "너무 긴장한 것도 있지만, 면접 연습이 부족했던 것 같아요. 혼자서만 준비하다 보니 실제 상황에 대한 대비가 부족했습니다.",
      feelings: "정말 절망적이었어요. 몇 달 동안 준비한 것이 한순간에 무너지는 느낌이었습니다. 하지만 지금 생각해보니 이것도 경험이고, 다음에는 더 잘할 수 있을 것 같아요.",
      plan: "모의 면접을 친구들과 더 많이 해보고, 면접 상황에서의 긴장을 줄이는 방법을 연습하겠습니다. 실패해도 끝이 아니라는 것을 명심하고 계속 도전하겠어요."
    },
    {
      id: 3,
      author: "류선진",
      date: "2024.01.22",
      failureLevel: 6,
      title: "중요한 프레젠테이션에서의 실수",
      emotion: '😅',
      content: "분기 실적 발표에서 데이터를 잘못 준비해서 임원진 앞에서 창피를 당했습니다. 질문에 제대로 답변하지 못했고, 준비 부족이 드러났어요.",
      reason: "여러 프로젝트를 동시에 진행하다 보니 각각에 집중하지 못했습니다. 특히 데이터 검증 과정을 소홀히 했던 것 같아요.",
      feelings: "프로답지 못했다는 생각에 자괴감이 들었습니다. 하지만 상사가 나중에 격려해주셔서 다시 힘을 낼 수 있었어요.",
      plan: "앞으로는 중요한 발표 전에 데이터를 두 번 이상 검토하고, 동료에게도 검증을 부탁하겠습니다. 한 번에 너무 많은 일을 맡지 않도록 우선순위를 정하겠어요."
    }
  ];

  const [currentDiaries, setCurrentDiaries] = useState<OtherDiary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<OtherDiary | null>(null);
  const [comments, setComments] = useState<{ nickname: string; content: string }[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [nicknameInput, setNicknameInput] = useState("");

  const loadRandomDiaries = () => {
    const shuffled = [...sampleDiaries].sort(() => 0.5 - Math.random());
    setCurrentDiaries(shuffled.slice(0, 2));
    setSelectedDiary(null);
  };

  // 컴포넌트 마운트 시 초기 일기 로드
  useState(() => {
    loadRandomDiaries();
  });

  if (selectedDiary) {
    const handleAddComment = () => {
      if (commentInput.trim() && nicknameInput.trim()) {
        setComments([
          ...comments,
          { nickname: nicknameInput.trim(), content: commentInput.trim() },
        ]);
        setCommentInput("");
      }
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedDiary(null)}
            className="text-gray-300 hover:text-gray-100 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </div>

        <Card className="border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
          <CardHeader className="border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedDiary.date}
                </span>
              </div>
              <span className="text-sm text-gray-400">by {selectedDiary.author}</span>
            </div>
            <CardTitle className="text-xl text-gray-200 mt-3 flex items-center gap-2">
              <span className="text-2xl">{selectedDiary.emotion}</span>
              <span>{selectedDiary.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-200 mb-2">실패 내용</h3>
              <p className="leading-relaxed">{selectedDiary.content}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-200 mb-2">실패 이유</h3>
              <p className="leading-relaxed">{selectedDiary.reason}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-200 mb-2">느낀 점</h3>
              <p className="leading-relaxed">{selectedDiary.feelings}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-200 mb-2">앞으로의 계획</h3>
              <p className="leading-relaxed">{selectedDiary.plan}</p>
            </div>
          </CardContent>
        </Card>

        {/* 응원글(댓글) 영역 */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-inner">
          <h3 className="text-lg font-bold text-gray-200 mb-4">응원글 남기기</h3>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              className="flex-1 px-3 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="닉네임"
              value={nicknameInput}
              maxLength={12}
              onChange={e => setNicknameInput(e.target.value)}
            />
            <input
              className="flex-[2] px-3 py-2 rounded bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="응원글을 입력하세요"
              value={commentInput}
              maxLength={100}
              onChange={e => setCommentInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(); }}
            />
            <Button onClick={handleAddComment} className="bg-blue-700 hover:bg-blue-800 text-white">등록</Button>
          </div>
          <div>
            {comments.length === 0 ? (
              <p className="text-gray-400 text-sm">아직 응원글이 없습니다. 가장 먼저 응원해보세요!</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((c, idx) => (
                  <li key={idx} className="bg-gray-900 rounded px-4 py-2 text-gray-100 flex items-center gap-2">
                    <span className="font-semibold text-blue-300">{c.nickname}</span>
                    <span className="text-gray-400">|</span>
                    <span>{c.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-gray-300 hover:text-gray-100 hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>
        <Button 
          onClick={loadRandomDiaries}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-lg"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          새로운 일기 보기
        </Button>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">다른 사람의 일기</h1>
        <p className="text-gray-400">다른 사람들의 비슷한 실패 경험을 통해 위로받고 공감해보세요</p>
      </div>

      <div className="space-y-4">
        {currentDiaries.length > 0 ? (
          currentDiaries.map((diary) => (
            <Card 
              key={diary.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-gray-600 hover:border-gray-500 bg-gradient-to-br from-gray-800 to-gray-900"
              onClick={() => setSelectedDiary(diary)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {diary.date}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">by {diary.author}</span>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-200 group-hover:text-blue-300 flex items-center gap-2">
                  <span className="text-2xl">{diary.emotion}</span>
                  <span>{diary.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 line-clamp-2 mb-3">
                  {diary.content.length > 100 ? `${diary.content.substring(0, 100)}...` : diary.content}
                </p>
                <div className="flex items-center text-gray-300 text-sm font-medium">
                  <Eye className="w-4 h-4 mr-1" />
                  자세히 보기
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">표시할 일기가 없습니다.</p>
            <Button onClick={loadRandomDiaries} variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              일기 불러오기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOthersDiary;
