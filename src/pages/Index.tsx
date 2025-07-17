import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    skills: '',
    portfolio: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Code" size={24} className="text-primary" />
              <h1 className="text-xl font-semibold text-foreground">TechHire</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Главная</a>
              <a href="#requirements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Требования</a>
              <a href="#application" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Заявка</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Присоединяйтесь к нашей IT-команде
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы ищем талантливых разработчиков, дизайнеров и IT-специалистов для создания инновационных решений
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Send" size={20} className="mr-2" />
                Подать заявку
              </Button>
              <Button variant="outline" size="lg" className="text-base" onClick={() => document.getElementById('requirements')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="FileText" size={20} className="mr-2" />
                Требования
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Открытые позиции и требования
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Frontend Developer */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Monitor" size={24} className="text-primary" />
                    <CardTitle className="text-xl">Frontend Developer</CardTitle>
                  </div>
                  <Badge variant="secondary">React / TypeScript</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Требования:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Опыт с React 2+ года</li>
                        <li>• TypeScript, HTML5, CSS3</li>
                        <li>• Знание Tailwind CSS</li>
                        <li>• Опыт с Git</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Будет плюсом:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Next.js</li>
                        <li>• Опыт с API</li>
                        <li>• Знание UX/UI</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backend Developer */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Server" size={24} className="text-primary" />
                    <CardTitle className="text-xl">Backend Developer</CardTitle>
                  </div>
                  <Badge variant="secondary">Node.js / Python</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Требования:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Node.js или Python</li>
                        <li>• Опыт с базами данных</li>
                        <li>• REST API, GraphQL</li>
                        <li>• Знание Docker</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Будет плюсом:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Kubernetes</li>
                        <li>• AWS/GCP</li>
                        <li>• Микросервисы</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* UI/UX Designer */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Palette" size={24} className="text-primary" />
                    <CardTitle className="text-xl">UI/UX Designer</CardTitle>
                  </div>
                  <Badge variant="secondary">Figma / Adobe</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Требования:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Опыт в UI/UX дизайне</li>
                        <li>• Figma, Adobe XD</li>
                        <li>• Понимание веб-стандартов</li>
                        <li>• Портфолио проектов</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Будет плюсом:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Знание HTML/CSS</li>
                        <li>• Опыт с дизайн-системами</li>
                        <li>• Исследование пользователей</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Подать заявку
            </h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Форма заявки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя и фамилия *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Иван Иванов"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="ivan@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Желаемая позиция *</Label>
                      <Select onValueChange={(value) => handleInputChange('position', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите позицию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="frontend">Frontend Developer</SelectItem>
                          <SelectItem value="backend">Backend Developer</SelectItem>
                          <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                          <SelectItem value="designer">UI/UX Designer</SelectItem>
                          <SelectItem value="qa">QA Engineer</SelectItem>
                          <SelectItem value="devops">DevOps Engineer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Опыт работы *</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите опыт" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (до 1 года)</SelectItem>
                        <SelectItem value="middle">Middle (1-3 года)</SelectItem>
                        <SelectItem value="senior">Senior (3+ лет)</SelectItem>
                        <SelectItem value="lead">Team Lead (5+ лет)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="skills">Основные навыки *</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="Перечислите ваши основные технические навыки..."
                      className="min-h-[80px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolio">Портфолио / GitHub</Label>
                    <Input
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange('portfolio', e.target.value)}
                      placeholder="https://github.com/username или ссылка на портфолио"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Сопроводительное письмо</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Расскажите о себе, почему хотите работать с нами..."
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left hover:text-primary">
                  Какой формат работы предполагается?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы поддерживаем гибридный формат работы. Возможна удаленная работа с периодическими встречами в офисе или полностью удаленная работа для опытных специалистов.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left hover:text-primary">
                  Как долго длится процесс собеседования?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Обычно процесс занимает 1-2 недели и включает: техническое интервью, собеседование с командой и финальную встречу с руководителем.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left hover:text-primary">
                  Предоставляется ли оборудование для работы?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, мы предоставляем все необходимое оборудование: MacBook/PC, мониторы, периферию. Также компенсируем расходы на рабочее место дома.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left hover:text-primary">
                  Есть ли возможности для профессионального роста?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Конечно! Мы инвестируем в развитие команды: оплачиваем курсы, конференции, сертификации. Есть четкий план карьерного роста и менторинг.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left hover:text-primary">
                  Что включает в себя соцпакет?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Полный соцпакет включает: ДМС, отпуск 28 дней, оплачиваемые больничные, компенсация спорта, корпоративные мероприятия и многое другое.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Code" size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-foreground">TechHire</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Создаем будущее вместе с лучшими IT-специалистами
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:hr@techhire.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
              <a href="https://telegram.me/techhire" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="https://github.com/techhire" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}