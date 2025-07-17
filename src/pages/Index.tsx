import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    requestType: '',
    priority: '',
    subject: '',
    description: '',
    expectedDate: '',
    attachments: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/your-webhook-url');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);
    
    try {
      // Подготовка данных для отправки
      const submitData = {
        ...formData,
        timestamp: new Date().toISOString(),
        requestId: `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'pending'
      };
      
      // Отправка на webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log('Заявка успешно отправлена:', submitData);
      setIsSubmitted(true);
      
      // Очистка формы после успешной отправки
      setFormData({
        employeeName: '',
        department: '',
        position: '',
        email: '',
        phone: '',
        requestType: '',
        priority: '',
        subject: '',
        description: '',
        expectedDate: '',
        attachments: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 8000);
      
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      setSubmitError(
        error instanceof Error 
          ? `Ошибка отправки: ${error.message}`
          : 'Произошла неизвестная ошибка при отправке заявки'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const requestTypes = [
    { value: 'vacation', label: 'Отпуск', icon: 'Calendar', color: 'bg-blue-500' },
    { value: 'suggestion', label: 'Предложение', icon: 'Lightbulb', color: 'bg-green-500' },
    { value: 'complaint', label: 'Жалоба', icon: 'AlertTriangle', color: 'bg-red-500' },
    { value: 'request', label: 'Запрос', icon: 'MessageSquare', color: 'bg-purple-500' },
    { value: 'technical', label: 'Техническая поддержка', icon: 'Settings', color: 'bg-orange-500' },
    { value: 'hr', label: 'HR вопрос', icon: 'Users', color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building" size={24} className="text-primary" />
              <h1 className="text-xl font-semibold text-foreground">CorporateConnect</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Система подачи заявок</span>
              <Badge variant="secondary">Внутренняя система</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Форма для подачи заявок</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Быстрый и удобный способ направить вашу заявку, предложение или обращение непосредственно руководству компании
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="Send" size={20} className="mr-2" />
                Подать заявку
              </Button>
              <Button variant="outline" size="lg" className="text-base" onClick={() => document.getElementById('types')?.scrollIntoView({ behavior: 'smooth' })}>
                <Icon name="List" size={20} className="mr-2" />
                Типы заявок
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Request Types Section */}
      <section id="types" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Типы заявок
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requestTypes.map((type) => (
                <Card key={type.value} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <Icon name={type.icon as any} size={20} className="text-white" />
                      </div>
                      <CardTitle className="text-lg">{type.label}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {type.value === 'vacation' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Заявки на отпуск:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Очередной отпуск</li>
                            <li>• Отпуск без сохранения</li>
                            <li>• Дополнительные дни</li>
                          </ul>
                        </div>
                      )}
                      {type.value === 'suggestion' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Предложения:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Улучшение процессов</li>
                            <li>• Новые инициативы</li>
                            <li>• Рационализация</li>
                          </ul>
                        </div>
                      )}
                      {type.value === 'complaint' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Жалобы:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Нарушения</li>
                            <li>• Конфликты</li>
                            <li>• Недовольство условиями</li>
                          </ul>
                        </div>
                      )}
                      {type.value === 'request' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Запросы:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Оборудование</li>
                            <li>• Документы</li>
                            <li>• Разрешения</li>
                          </ul>
                        </div>
                      )}
                      {type.value === 'technical' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Техподдержка:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• IT проблемы</li>
                            <li>• Доступы</li>
                            <li>• Программное обеспечение</li>
                          </ul>
                        </div>
                      )}
                      {type.value === 'hr' && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">HR вопросы:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Кадровые вопросы</li>
                            <li>• Обучение</li>
                            <li>• Льготы и компенсации</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Подача заявки
            </h2>
            
            {isSubmitted && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <Icon name="CheckCircle" size={16} className="text-green-600" />
                <AlertDescription className="text-green-800">
                  Заявка успешно отправлена! Номер заявки: #2024-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
                  <br />
                  Ожидайте ответа на указанный email в течение 3-5 рабочих дней.
                </AlertDescription>
              </Alert>
            )}
            
            {submitError && (
              <Alert className="mb-6 bg-red-50 border-red-200">
                <Icon name="AlertCircle" size={16} className="text-red-600" />
                <AlertDescription className="text-red-800">
                  {submitError}
                  <br />
                  <span className="text-sm">Попробуйте еще раз или обратитесь к администратору.</span>
                </AlertDescription>
              </Alert>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Форма заявки генеральному директору
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Employee Information */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-foreground mb-4">Информация о сотруднике</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employeeName">ФИО *</Label>
                        <Input
                          id="employeeName"
                          value={formData.employeeName}
                          onChange={(e) => handleInputChange('employeeName', e.target.value)}
                          placeholder="Иванов Иван Иванович"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Отдел *</Label>
                        <Select onValueChange={(value) => handleInputChange('department', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите отдел" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">IT отдел</SelectItem>
                            <SelectItem value="hr">HR отдел</SelectItem>
                            <SelectItem value="finance">Финансовый отдел</SelectItem>
                            <SelectItem value="marketing">Маркетинг</SelectItem>
                            <SelectItem value="sales">Продажи</SelectItem>
                            <SelectItem value="operations">Операционный отдел</SelectItem>
                            <SelectItem value="legal">Юридический отдел</SelectItem>
                            <SelectItem value="admin">Административный отдел</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="position">Должность *</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => handleInputChange('position', e.target.value)}
                          placeholder="Менеджер"
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
                          placeholder="ivanov@company.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-foreground mb-4">Детали заявки</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="requestType">Тип заявки *</Label>
                        <Select onValueChange={(value) => handleInputChange('requestType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            {requestTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Приоритет *</Label>
                        <Select onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите приоритет" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Низкий
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                Средний
                              </div>
                            </SelectItem>
                            <SelectItem value="high">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                Высокий
                              </div>
                            </SelectItem>
                            <SelectItem value="urgent">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                                Срочный
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="subject">Тема заявки *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Краткое описание заявки"
                        required
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="description">Подробное описание *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Детальное описание заявки, обоснование, предлагаемые решения..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="expectedDate">Желаемая дата рассмотрения</Label>
                        <Input
                          id="expectedDate"
                          type="date"
                          value={formData.expectedDate}
                          onChange={(e) => handleInputChange('expectedDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="attachments">Вложения (ссылки)</Label>
                        <Input
                          id="attachments"
                          value={formData.attachments}
                          onChange={(e) => handleInputChange('attachments', e.target.value)}
                          placeholder="Ссылки на документы или файлы"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon name="Info" size={16} className="text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800">Важная информация:</p>
                        <ul className="text-yellow-700 mt-1 space-y-1">
                          <li>• Все заявки рассматриваются в порядке поступления</li>
                          <li>• Срок рассмотрения: 3-5 рабочих дней</li>
                          <li>• О результатах будет сообщено на указанный email</li>
                          <li>• Конфиденциальность гарантирована</li>
                          <li>• Данные отправляются через защищенный webhook</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Отправка заявки...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить заявку генеральному директору
                      </>
                    )}
                  </Button>
                  
                  {/* Webhook Configuration */}
                  <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <Label htmlFor="webhookUrl" className="text-sm font-medium text-gray-700">
                      URL Webhook (для администраторов)
                    </Label>
                    <Input
                      id="webhookUrl"
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://hooks.zapier.com/hooks/catch/your-webhook-url"
                      className="mt-1 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Можно использовать Zapier, Make.com, или любой другой webhook сервис
                    </p>
                  </div>
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
                  Как долго рассматриваются заявки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Стандартный срок рассмотрения заявок составляет 3-5 рабочих дней. Срочные заявки рассматриваются в первоочередном порядке в течение 1-2 дней.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left hover:text-primary">
                  Будет ли сохранена анонимность?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Все заявки обрабатываются конфиденциально. Информация о заявителе доступна только генеральному директору и уполномоченным лицам.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left hover:text-primary">
                  Можно ли отозвать заявку?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, заявку можно отозвать до момента её рассмотрения. Для этого обратитесь к секретарю генерального директора с номером заявки.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left hover:text-primary">
                  Что делать если не получил ответ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Если по истечении 7 рабочих дней ответ не получен, обратитесь в приёмную генерального директора для уточнения статуса заявки.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left hover:text-primary">
                  Какие документы могут потребоваться?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  В зависимости от типа заявки могут потребоваться: справки, документы, обоснования, расчёты. Конкретные требования будут указаны в ответе.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Icon name="Building" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">CorporateConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Внутренняя система подачи заявок • Конфиденциально • Безопасно
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}