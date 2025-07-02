
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
      failureLevel: '5',
      failureContent: '팀 회의에서 의견을 제대로 전달하지 못했습니다.',
      failureReason: '긴장해서 말이 잘 나오지 않았어요.',
      feelings: '아쉬웠지만 다음 기회에는 더 잘할 수 있을 것 같습니다.',
      futurePlan: '미리 의견을 정리해서 회의에 참석하겠습니다.'
    }
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-gray-200" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">
                실패 일기장
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                실패는 성공의 어머니입니다. 당신의 실패 경험을 기록하고, 
                AI의 따뜻한 피드백을 통해 더 나은 내일을 만들어보세요.
              </p>
            </div>

            {/* Calendar Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full">
                      <CalendarDays className="w-5 h-5 text-gray-200" />
                    </div>
                    <CardTitle className="text-gray-200">나의 실패 일기</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">
                    날짜를 선택하여 작성한 실패 일기를 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md border-0 text-gray-200"
                    modifiers={{
                      hasDiary: sampleDiaries.map(diary => diary.date)
                    }}
                    modifiersStyles={{
                      hasDiary: { backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold' }
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-600 hover:border-gray-500 bg-gradient-to-br from-gray-800 to-gray-900"
                onClick={() => setCurrentView('write')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-900 to-pink-900 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-red-300" />
                  </div>
                  <CardTitle className="text-gray-200">오늘의 실패 일기 작성</CardTitle>
                  <CardDescription className="text-gray-400">
                    오늘 겪은 실패를 기록하고 AI의 따뜻한 위로와 조언을 받아보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                    일기 작성하기
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-gray-600 hover:border-gray-500 bg-gradient-to-br from-gray-800 to-gray-900"
                onClick={() => setCurrentView('view')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-300" />
                  </div>
                  <CardTitle className="text-gray-200">다른 사람의 실패 일기</CardTitle>
                  <CardDescription className="text-gray-400">
                    다른 사람들의 실패 경험을 읽으며 위로받고 공감하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-gray-500 text-gray-200 hover:bg-gray-700 hover:text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
