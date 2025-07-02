
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, Heart, Users, TrendingUp, CalendarDays } from "lucide-react";
import WriteFailureDiary from "@/components/WriteFailureDiary";
import ViewOthersDiary from "@/components/ViewOthersDiary";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'write' | 'view'>('home');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const renderContent = () => {
    switch (currentView) {
      case 'write':
        return <WriteFailureDiary onBack={() => setCurrentView('home')} />;
      case 'view':
        return <ViewOthersDiary onBack={() => setCurrentView('home')} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                실패 일기장
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                실패는 성공의 어머니입니다. 당신의 실패 경험을 기록하고, 
                AI의 따뜻한 피드백을 통해 더 나은 내일을 만들어보세요.
              </p>
            </div>

            {/* Calendar Section */}
            <div className="max-w-2xl mx-auto">
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full">
                      <CalendarDays className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-purple-700">나의 실패 일기</CardTitle>
                  </div>
                  <CardDescription>
                    날짜를 선택하여 작성한 실패 일기를 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50"
                onClick={() => setCurrentView('write')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-700">오늘의 실패 일기 작성</CardTitle>
                  <CardDescription>
                    오늘 겪은 실패를 기록하고 AI의 따뜻한 위로와 조언을 받아보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    일기 작성하기
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-indigo-200 hover:border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50"
                onClick={() => setCurrentView('view')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-indigo-700">다른 사람의 실패 일기</CardTitle>
                  <CardDescription>
                    다른 사람들의 실패 경험을 읽으며 위로받고 공감하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50">
                    일기 둘러보기
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                실패 일기장이 도와드리는 것들
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">자기성장 지원</h3>
                  <p className="text-sm text-gray-600">
                    실패를 분석하고 AI 피드백을 통해 발전 방향을 찾아보세요
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full">
                    <Heart className="w-6 h-6 text-violet-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">정서적 안정</h3>
                  <p className="text-sm text-gray-600">
                    실패로 인한 감정을 정리하고 위로받는 경험을 제공합니다
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">공감과 연대</h3>
                  <p className="text-sm text-gray-600">
                    다른 사람들의 경험을 통해 혼자가 아님을 느껴보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
