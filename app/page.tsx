import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Briefcase, Users, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,197,185,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.14),transparent_36%)]" />
      {/* Navigation */}
      <nav className="border-b border-white/20 backdrop-blur-2xl bg-white/60 dark:bg-slate-900/70 sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-12 2xl:px-16 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground tracking-tight">SmartRecruit</div>
          <div className="text-sm text-muted-foreground">AI-Powered Recruitment Platform</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 2xl:px-16">
        <div className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">AI Recruitment</p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-balance text-foreground">
              Glassy, modern hiring experience for candidates & recruiters
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              SmartRecruit là nền tảng tìm kiếm việc làm và tuyển dụng thông minh. Với AI tiên tiến, ứng viên được đánh giá CV chi tiết, highlight lỗi và gợi ý cải thiện. Nhà tuyển dụng tự động xếp hạng CV phù hợp nhất với JD.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/candidate/dashboard">
                <Button size="lg" className="w-full sm:w-auto shadow-[0_20px_60px_-30px_rgba(56,197,185,0.8)]">
                  Tôi là Ứng viên
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recruiter/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/60 dark:bg-white/10 border-primary/30 text-foreground"
                >
                  Tôi là Nhà tuyển dụng
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-white/40 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.65)]">
            <div className="grid gap-4">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/30 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Match Rate</span>
                  <Badge className="bg-primary/15 text-primary border-primary/20">Live</Badge>
                </div>
                <p className="text-4xl font-bold text-foreground mt-2">92%</p>
                <p className="text-sm text-muted-foreground">AI matching accuracy across candidates & jobs</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20">
                  <p className="text-xs text-muted-foreground mb-1">Ứng viên đánh giá</p>
                  <p className="text-xl font-semibold text-foreground">1,247 CV</p>
                  <p className="text-xs text-primary">+42% tuần này</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20">
                  <p className="text-xs text-muted-foreground mb-1">Công việc đã đăng</p>
                  <p className="text-xl font-semibold text-foreground">356 job</p>
                  <p className="text-xs text-primary">+18 job hôm nay</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-linear-to-r from-primary/15 via-primary/10 to-accent/15 border border-primary/20">
                <p className="text-sm text-foreground font-semibold mb-1">AI Gợi ý</p>
                <p className="text-sm text-muted-foreground">
                  Đề xuất ứng viên & công việc theo thời gian thực dựa trên kỹ năng, văn hóa và kinh nghiệm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 2xl:px-16">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center mb-12">Why SmartRecruit?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass">
              <CardHeader>
                <Briefcase className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI Matching & Scoring</CardTitle>
                <CardDescription>Đối sánh CV với JD và đánh giá điểm ATS thông minh</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Thuật toán tìm kiếm “fit” nhất giữa CV và JD, nâng điểm match tự động và giảm thời gian sàng lọc.
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI cho Ứng viên</CardTitle>
                <CardDescription>Highlight lỗi, đề xuất từ khóa, gợi ý sửa nội dung</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                AI phân tích CV, highlight lỗi và thiếu kỹ năng so với JD. Đề xuất từ khóa phù hợp, gợi ý cách sửa nội dung để tăng điểm ATS và cơ hội trúng tuyển.
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI cho Nhà tuyển dụng</CardTitle>
                <CardDescription>Scan và xếp hạng CV tự động theo độ phù hợp</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                AI scan tất cả CV ứng viên so với JD của bạn, tự động xếp hạng các CV phù hợp nhất. Tiết kiệm thời gian sàng lọc và tìm được ứng viên tốt nhất nhanh chóng.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 2xl:px-16">
        <div className="w-full glass rounded-3xl border border-white/30 p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cách SmartRecruit hoạt động</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Cho Ứng viên</h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">1</span>
                  <span>Tải CV lên hệ thống, AI tự động parse thông tin</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">2</span>
                  <span>AI match CV với JD, highlight lỗi và thiếu kỹ năng</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">3</span>
                  <span>Nhận đề xuất từ khóa và gợi ý sửa nội dung CV</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">4</span>
                  <span>AI chấm điểm ATS (cấu trúc, độ dài, từ khóa, phù hợp JD) và giải thích chi tiết</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">5</span>
                  <span>Xem lý do điểm thấp, kỹ năng thiếu, phần trùng lập để cải thiện</span>
                </li>
              </ol>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Cho Nhà tuyển dụng</h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">1</span>
                  <span>Đăng Job Description (JD), định nghĩa kỹ năng và yêu cầu cần thiết</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">2</span>
                  <span>AI tự động scan tất cả CV ứng viên so với JD của bạn</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">3</span>
                  <span>AI xếp hạng các CV phù hợp nhất theo match score</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">4</span>
                  <span>Xem chi tiết từng ứng viên: điểm match, kỹ năng khớp, kỹ năng thiếu</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary min-w-8">5</span>
                  <span>Quản lý pipeline, xuất báo cáo và chọn ứng viên tốt nhất</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 2xl:px-16 text-center">
        <div className="w-full glass rounded-3xl p-10 border border-white/30">
          <h2 className="text-3xl font-bold mb-6">Sẵn sàng bắt đầu?</h2>
          <p className="text-lg text-muted-foreground mb-8">Chọn vai trò và trải nghiệm tuyển dụng hiện đại</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/candidate/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Bắt đầu với tư cách Ứng viên
              </Button>
            </Link>
            <Link href="/recruiter/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Bắt đầu với tư cách Nhà tuyển dụng
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8 px-4 sm:px-6 lg:px-12 2xl:px-16">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 SmartRecruit. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
