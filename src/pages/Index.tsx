import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, Heart, Users, CalendarDays } from "lucide-react";
import WriteFailureDiary from "@/components/WriteFailureDiary";
import ViewOthersDiary from "@/components/ViewOthersDiary";
import ViewDiaryByDate from "@/components/ViewDiaryByDate";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'write' | 'view' | 'viewByDate'>('home');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // 샘플 일기 데이터 (실제로는 데이터베이스에서 가져올 데이터)
  const sampleDiaries = [
    {
      id: 1,
      date: new Date(2024, 11, 15), // 2024-12-15
      failureLevel: '7',
      failureContent: '오늘 중요한 프레젠테이션에서 실수를 했습니다. 데이터를 잘못 준비해서 질문에 제대로 답변하지 못했어요.',
      failureReason: '준비 시간이 부족했고, 데이터 검증을 꼼꼼히 하지 않았습니다.',
      feelings: '정말 창피하고 실망스러웠습니다. 하지만 다음엔 더 잘할 수 있을 것 같아요.',
      futurePlan: '앞으로는 프레젠테이션 전에 반드시 데이터를 두 번 이상 검토하겠습니다.'
    },
    {
      id: 2,
      date: new Date(), // 오늘
      failureLevel: '너무 아쉬운 의사표현 실패',
      failureContent: '오늘 중요한 발표에서 준비한 내용을 제대로 전달하지 못했다.',
      failureReason: '실패한 이유는 사전에 준비가 약간 부족했기 때문입니다!',
      feelings: '이번 경험을 통해 사전준비의 중요성을 배울 수 있었습니다!',
      futurePlan: '사전 준비를 하고 더블체크를 통해 빠드린것이 없는지 한번더 확인해볼 예정입니다'
    },
    {
      id: 4,
      date: new Date(2025, 5, 30), // 2025-06-30
      failureLevel: '준비는 충분했지만, 순간의 긴장에는 익숙하지 않았다',
      failureContent: '회사 발표 중 질의응답 시간에 예상치 못한 질문을 받고 당황해 아무런 대답도 하지 못했다',
      failureReason: '발표 자체는 충분히 준비했지만, 돌발 상황에 대한 시뮬레이션과 공식적인 자리에서의 발표 경험이 부족했다',
      feelings: '실패가 꼭 준비 부족 때문만은 아니라는 걸 처음 느꼈다. 완벽하려는 마음이 오히려 스스로를 더 긴장하게 만들었고, 그동안의 노력까지 부정하게 만들었다. 그 순간을 지나고 나니, 나 자신에게 너무 가혹했단 생각이 들었다.',
      futurePlan: '앞으로는 돌발 질문 대응력을 기르기 위해 발표 연습 시 가상의 질문을 받아보며 연습할 계획이다. 또한, 예상치 못한 상황에서도 당황하지 않도록 말문을 여는 문장을 미리 준비해두고, 긴장을 조절하는 루틴도 만들어보려 한다.'
    },
    {
      id: 5,
      date: new Date(2025, 5, 27), // 2025-06-27
      failureLevel: '준비는 충분했지만, 순간의 긴장에는 익숙하지 않았다',
      failureContent: '회사 발표 중 질의응답 시간에 예상치 못한 질문을 받고 당황해 아무런 대답도 하지 못했다',
      failureReason: '발표 자체는 충분히 준비했지만, 돌발 상황에 대한 시뮬레이션과 공식적인 자리에서의 발표 경험이 부족했다',
      feelings: '실패가 꼭 준비 부족 때문만은 아니라는 걸 처음 느꼈다. 완벽하려는 마음이 오히려 스스로를 더 긴장하게 만들었고, 그동안의 노력까지 부정하게 만들었다. 그 순간을 지나고 나니, 나 자신에게 너무 가혹했단 생각이 들었다.',
      futurePlan: '앞으로는 돌발 질문 대응력을 기르기 위해 발표 연습 시 가상의 질문을 받아보며 연습할 계획이다. 또한, 예상치 못한 상황에서도 당황하지 않도록 말문을 여는 문장을 미리 준비해두고, 긴장을 조절하는 루틴도 만들어보려 한다.'
    },
    {
      id: 6,
      date: new Date(2025, 6, 3), // 2025-07-03
      failureLevel: '준비는 충분했지만, 순간의 긴장에는 익숙하지 않았다',
      failureContent: '회사 발표 중 질의응답 시간에 예상치 못한 질문을 받고 당황해 아무런 대답도 하지 못했다',
      failureReason: '발표 자체는 충분히 준비했지만, 돌발 상황에 대한 시뮬레이션과 공식적인 자리에서의 발표 경험이 부족했다',
      feelings: '실패가 꼭 준비 부족 때문만은 아니라는 걸 처음 느꼈다. 완벽하려는 마음이 오히려 스스로를 더 긴장하게 만들었고, 그동안의 노력까지 부정하게 만들었다. 그 순간을 지나고 나니, 나 자신에게 너무 가혹했단 생각이 들었다.',
      futurePlan: '앞으로는 돌발 질문 대응력을 기르기 위해 발표 연습 시 가상의 질문을 받아보며 연습할 계획이다. 또한, 예상치 못한 상황에서도 당황하지 않도록 말문을 여는 문장을 미리 준비해두고, 긴장을 조절하는 루틴도 만들어보려 한다.'
    },
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // 해당 날짜에 일기가 있는지 확인
      const diaryForDate = sampleDiaries.find(diary => 
        diary.date.toDateString() === date.toDateString()
      );
      if (diaryForDate) {
        setCurrentView('viewByDate');
      }
    }
  };

  const getDiaryForDate = (date: Date) => {
    return sampleDiaries.find(diary => 
      diary.date.toDateString() === date.toDateString()
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'write':
        return <WriteFailureDiary onBack={() => setCurrentView('home')} />;
      case 'view':
        return <ViewOthersDiary onBack={() => setCurrentView('home')} />;
      case 'viewByDate':
        const diary = selectedDate ? getDiaryForDate(selectedDate) : null;
        return diary ? (
          <ViewDiaryByDate 
            diary={diary} 
            onBack={() => setCurrentView('home')} 
          />
        ) : null;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-slate-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                아이고 또 망했네 일기장
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                실패는 성공의 어머니입니다. 당신의 실패 경험을 기록하고, 
                AI의 따뜻한 피드백을 통해 더 나은 내일을 만들어보세요.
              </p>
            </div>

            {/* Calendar Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-slate-600 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full">
                      <CalendarDays className="w-5 h-5 text-indigo-200" />
                    </div>
                    <CardTitle className="text-slate-200">나의 일기</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    날짜를 선택하여 작성한 일기를 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border-0 text-slate-200"
                    modifiers={{
                      hasDiary: sampleDiaries.map(diary => diary.date)
                    }}
                    modifiersStyles={{
                      hasDiary: { backgroundColor: '#8b5cf6', color: 'white', fontWeight: 'bold' }
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-slate-600 hover:border-slate-500 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm"
                onClick={() => setCurrentView('write')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-rose-200" />
                  </div>
                  <CardTitle className="text-slate-200">오늘의 일기 작성</CardTitle>
                  <CardDescription className="text-slate-400">
                    오늘 겪은 실패를 기록하고 AI의 따뜻한 위로와 조언을 받아보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg">
                    일기 작성하기
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-slate-600 hover:border-slate-500 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm"
                onClick={() => setCurrentView('view')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-indigo-200" />
                  </div>
                  <CardTitle className="text-slate-200">다른 사람의 일기</CardTitle>
                  <CardDescription className="text-slate-400">
                    비슷한 실패를 경험한 다른 사람의 일기를 읽어보며 위로받고 공강해보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-lg"
                  >
                    일기 둘러보기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
