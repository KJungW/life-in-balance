
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Users, TrendingUp } from "lucide-react";
import WriteFailureDiary from "@/components/WriteFailureDiary";
import ViewOthersDiary from "@/components/ViewOthersDiary";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'write' | 'view'>('home');

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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-rose-600" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                실패 일기장
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                실패는 성공의 어머니입니다. 당신의 실패 경험을 기록하고, 
                AI의 따뜻한 피드백을 통해 더 나은 내일을 만들어보세요.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-rose-200 hover:border-rose-300"
                onClick={() => setCurrentView('write')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-rose-600" />
                  </div>
                  <CardTitle className="text-rose-700">오늘의 실패 일기 작성</CardTitle>
                  <CardDescription>
                    오늘 겪은 실패를 기록하고 AI의 따뜻한 위로와 조언을 받아보세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                    일기 작성하기
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-blue-200 hover:border-blue-300"
                onClick={() => setCurrentView('view')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-700">다른 사람의 실패 일기</CardTitle>
                  <CardDescription>
                    다른 사람들의 실패 경험을 읽으며 위로받고 공감하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
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
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">자기성장 지원</h3>
                  <p className="text-sm text-gray-600">
                    실패를 분석하고 AI 피드백을 통해 발전 방향을 찾아보세요
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">정서적 안정</h3>
                  <p className="text-sm text-gray-600">
                    실패로 인한 감정을 정리하고 위로받는 경험을 제공합니다
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full">
                    <Users className="w-6 h-6 text-orange-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
