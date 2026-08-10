export interface Question {
  id: number;
  category: string;
  question: string;
  multipleChoice: boolean;
  selectCount?: number;
  options: {
    letter: string;
    text: string;
    correct: boolean;
  }[];
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    category: "Threat Modeling",
    question:
      "Um engenheiro está considerando respostas apropriadas a riscos usando modelagem de ameaças. Eles estão tentando entender quais atores de ameaças estão no escopo para sua organização. Como a modelagem de ameaças identifica os principais riscos e as táticas, técnicas e procedimentos (TTPs) aos quais seu sistema pode estar suscetível? (Selecione as três melhores opções.)",
    multipleChoice: true,
    selectCount: 3,
    options: [
      { letter: "A", text: "Através do uso de ferramentas como diagramas", correct: true },
      { letter: "B", text: "Avaliando um sistema de uma perspectiva neutra", correct: false },
      { letter: "C", text: "Analisando o sistema da perspectiva do defensor", correct: true },
      { letter: "D", text: "Avaliando o sistema do ponto de vista do atacante", correct: true },
    ],
    explanation:
      "A modelagem de ameaças identifica os principais riscos e TTPs aos quais um sistema pode estar suscetível através da avaliação de sistemas do ponto de vista do atacante. Diagramas podem mostrar como um analista de segurança pode decompor um sistema em suas partes funcionais para analisar cada área em busca de possíveis fragilidades. Analisar sistemas da perspectiva do defensor é outra forma de identificar riscos e TTPs. Avaliar sistemas de uma perspectiva neutra não é um método usado na modelagem de ameaças.",
  },
  {
    id: 2,
    category: "Controles de Segurança",
    question:
      "Um analista de segurança revisa os endereços IP de origem dos logs de um firewall para investigar um ataque. Esses logs são uma representação de qual tipo de controle de segurança funcional?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Corretivo", correct: false },
      { letter: "B", text: "Compensatório", correct: false },
      { letter: "C", text: "Preventivo", correct: false },
      { letter: "D", text: "Detetivo", correct: true },
    ],
    explanation:
      "O controle detetivo pode não prevenir ou deter o acesso, mas identificará e registrará qualquer tentativa ou intrusão bem-sucedida. Um controle detetivo opera durante o progresso de um ataque. Logs fornecem um dos melhores exemplos de controles do tipo detetivo. Um bom exemplo de controle corretivo é um sistema de backup que pode restaurar dados danificados por um atacante durante uma intrusão. Controles preventivos atuam para eliminar ou reduzir a probabilidade de que um ataque seja bem-sucedido, operando antes que o ataque ocorra. O controle compensatório é um substituto para um controle principal, conforme recomendado por um padrão de segurança.",
  },
  {
    id: 3,
    category: "Gestão de Risco",
    question:
      "Um CEO de uma pequena corporação decidiu continuar usando um sistema legado apesar das preocupações de segurança. Este é um exemplo de qual princípio de gestão de risco?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Aceitação de risco", correct: true },
      { letter: "B", text: "Transferência de risco", correct: false },
      { letter: "C", text: "Evasão de risco", correct: false },
      { letter: "D", text: "Mitigação de risco", correct: false },
    ],
    explanation:
      "A aceitação de risco significa que a empresa continua a operar sem mudanças após avaliar um item de risco identificado, como usar um sistema legado apesar de preocupações de segurança. A evasão de risco frequentemente significa que a empresa interrompe a atividade geradora de risco. A mitigação de risco é quando uma empresa reduz a exposição a itens de risco implementando controles mitigadores. A transferência de risco (ou compartilhamento) significa que a empresa atribuiria o risco a um terceiro, tipicamente através de apólices de seguro.",
  },
  {
    id: 4,
    category: "Controles de Segurança",
    question:
      "Um engenheiro de segurança instala um firewall de próxima geração no perímetro de uma rede. Esta instalação é um exemplo de qual tipo de classe de controle de segurança?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Detetivo", correct: false },
      { letter: "B", text: "Gerencial", correct: false },
      { letter: "C", text: "Operacional", correct: false },
      { letter: "D", text: "Técnico", correct: true },
    ],
    explanation:
      "Firewalls, software antivírus e modelos de controle de acesso do sistema operacional (OS) são exemplos de controles técnicos. O engenheiro implementaria um controle técnico como um sistema (hardware, software ou firmware). O controle gerencial fornece supervisão do sistema de informação. Pessoas implementam principalmente controles operacionais em vez de sistemas, como guardas de segurança e programas de treinamento. O controle detetivo é um controle funcional que não é uma classe de controle de segurança.",
  },
  {
    id: 5,
    category: "Controles de Segurança",
    question:
      "Qual das seguintes é um exemplo de um controle técnico em cibersegurança?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Condução de auditorias de segurança regulares e avaliações de risco para identificar vulnerabilidades", correct: false },
      { letter: "B", text: "Desenvolvimento e aplicação de políticas e procedimentos de segurança para proteção de dados", correct: false },
      { letter: "C", text: "Condução de treinamento de segurança para funcionários para promover melhores práticas de gerenciamento de senhas", correct: false },
      { letter: "D", text: "Implementação de firewalls e software antivírus para prevenir acesso não autorizado e infecções por malware", correct: true },
    ],
    explanation:
      "Sistemas como hardware, software ou firmware implementam controles técnicos, que podem prevenir acesso não autorizado e infecções por malware. Exemplos de controles técnicos incluem firewalls e software antivírus. O controle administrativo assume a forma de treinamento de segurança para funcionários. Controles administrativos envolvem o desenvolvimento e aplicação de políticas e procedimentos de segurança. O controle gerencial assume a forma de condução de auditorias de segurança e avaliações de risco.",
  },
  {
    id: 6,
    category: "Controles de Segurança",
    question:
      "Um administrador de sistemas está fortalecendo um servidor recém-provisionado com patches de software e atualizações de segurança. Qual controle de segurança funcional o administrador de sistemas está executando?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Preventivo", correct: true },
      { letter: "B", text: "Corretivo", correct: false },
      { letter: "C", text: "Compensatório", correct: false },
      { letter: "D", text: "Detetivo", correct: false },
    ],
    explanation:
      "Controles preventivos atuam para eliminar ou reduzir a probabilidade de que um ataque seja bem-sucedido, operando antes que um ataque possa ocorrer. A implementação de patches de software e atualizações de segurança são exemplos de controles preventivos. O controle detetivo identifica e registra tentativas de intrusão. Um bom exemplo de controle corretivo é um sistema de backup. O controle compensatório é um substituto para um controle principal.",
  },
  {
    id: 7,
    category: "Patch Management",
    question:
      "Um sistema crítico está offline em uma organização devido a um ataque de dia zero. O fornecedor de software associado planeja lançar um patch para remediar a vulnerabilidade. Quais das seguintes são considerações importantes de gerenciamento de patches para este cenário? (Selecione as três melhores opções.)",
    multipleChoice: true,
    selectCount: 3,
    options: [
      { letter: "A", text: "Um cronograma de rotina para a implantação de patches não críticos", correct: false },
      { letter: "B", text: "Uma equipe específica responsável por revisar boletins de fornecedores e boletins de patches de segurança", correct: true },
      { letter: "C", text: "Um ambiente de teste de patches", correct: true },
      { letter: "D", text: "Entrega rápida de patches críticos de segurança", correct: true },
    ],
    explanation:
      "Um ambiente de teste de patches onde técnicos podem instalar, testar e analisar patches urgentes e importantes antes da implantação em produção seria uma consideração vital. A organização deve entregar imediatamente os patches críticos de segurança assim que estiverem disponíveis quando serviços críticos estão em questão. Uma equipe ou pessoa específica responsável por revisar boletins de fornecedores é necessária. Um cronograma de rotina para patches não críticos tem mérito, mas não ilustra considerações importantes neste cenário.",
  },
  {
    id: 8,
    category: "Change Management",
    question:
      "Um administrador de sistemas está realizando trabalho de patches no sistema de sua organização. O administrador percebe que a janela de manutenção fechará antes que eles completem o trabalho. Que ação o administrador deve tomar para cumprir a política de gerenciamento de mudanças?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Implantar patches do sistema", correct: false },
      { letter: "B", text: "Reverter para o estado anterior do sistema", correct: true },
      { letter: "C", text: "Reverter para o estado inicial do sistema", correct: false },
      { letter: "D", text: "Implantar patches anteriores", correct: false },
    ],
    explanation:
      "A política de gerenciamento de mudanças dita que a aplicação de patches deve terminar rápido o suficiente para acomodar planos de reversão se ocorrerem problemas, sem exceder a janela de manutenção. A reversão de gerenciamento de mudanças é o processo de desfazer as alterações do sistema para restaurá-lo a um estado anterior. Reverter para o estado inicial é possível, mas desaconselhável devido a preocupações de segurança. Simplesmente reverter para o estado anterior é o melhor curso de ação.",
  },
  {
    id: 9,
    category: "Controles de Segurança",
    question:
      "Um gerente de cibersegurança recém-contratado supervisiona as responsabilidades de controle operacional da organização. Qual das seguintes é um exemplo dessa responsabilidade?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Criação de uma política de senhas forte para os funcionários seguirem", correct: false },
      { letter: "B", text: "Monitoramento da rede por tentativas de acesso não autorizado", correct: true },
      { letter: "C", text: "Condução de uma avaliação de risco para identificar vulnerabilidades potenciais no sistema", correct: false },
      { letter: "D", text: "Instalação de software antivírus em todos os computadores da empresa", correct: false },
    ],
    explanation:
      "Controles operacionais são procedimentos e diretrizes do dia a dia implementados e seguidos por funcionários e equipe de TI. Monitorar a rede por tentativas de acesso não autorizado envolve supervisão contínua por pessoal de segurança e é um exemplo de atividade operacional diária. A condução de uma avaliação de risco é tipicamente classificada como controle administrativo. A instalação de antivírus é um controle técnico. A criação de uma política de senhas é um controle administrativo.",
  },
  {
    id: 10,
    category: "Controles de Segurança",
    question:
      "Um consultor de cibersegurança está examinando classes de controles de segurança para um provedor de Infraestrutura como Serviço (IaaS). As classes medem quão efetivamente os ativos são protegidos. Qual classe de controle de segurança o consultor examinaria para obter supervisão do sistema de informação?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Técnico", correct: false },
      { letter: "B", text: "Detetivo", correct: false },
      { letter: "C", text: "Gerencial", correct: true },
      { letter: "D", text: "Operacional", correct: false },
    ],
    explanation:
      "O controle gerencial fornece supervisão do sistema de informação. Exemplos podem incluir identificação de riscos ou uma ferramenta que permita a avaliação e seleção de outros controles de segurança. Firewalls, antivírus e modelos de controle de acesso do OS são exemplos de controles técnicos. Controles operacionais são implementados principalmente por pessoas. O controle detetivo é um controle funcional, não uma classe de controle de segurança.",
  },
  {
    id: 11,
    category: "Ameaças Avançadas",
    question:
      "Identificar ameaças persistentes avançadas (APTs) ajuda as organizações a se proteger contra ciberataques. Qual declaração sobre APTs é mais precisa?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "APTs visam apenas organizações de alto valor, então empresas menores não precisam se preocupar com elas", correct: false },
      { letter: "B", text: "APTs usam técnicas básicas de varredura, tornando-as mais fáceis de detectar e prevenir", correct: false },
      { letter: "C", text: "APTs empregam técnicas anti-forenses para evadir detecção, tornando-as difíceis de identificar e prevenir", correct: true },
      { letter: "D", text: "APTs são sempre realizadas por Estados-nação, então as organizações podem focar suas defesas nesses países", correct: false },
    ],
    explanation:
      "Empregar técnicas anti-forenses torna difícil identificar e prevenir APTs, mas entender essas técnicas pode ajudar as organizações a melhorar suas defesas. Hacktivistas, sindicatos de crime organizado e outros grupos realizam APTs, não apenas atores estatais. Detectar e prevenir APTs é difícil, pois usam técnicas avançadas de varredura e evasão. APTs podem visar organizações de todos os tamanhos.",
  },
  {
    id: 12,
    category: "Controles de Segurança",
    question:
      "A equipe do centro de operações de segurança (SOC) de uma grande corporação está processando um incidente recente. A equipe se refere a um playbook para orientação sobre o incidente. Que tipo de controle de segurança funcional o playbook representa?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Compensatório", correct: false },
      { letter: "B", text: "Corretivo", correct: false },
      { letter: "C", text: "Preventivo", correct: false },
      { letter: "D", text: "Responsivo", correct: true },
    ],
    explanation:
      "Controles responsivos servem para direcionar ações corretivas executadas após a equipe do SOC confirmar o incidente. A equipe frequentemente documenta essas ações em um playbook. Um exemplo de controle corretivo é um sistema de backup. Controles preventivos atuam para eliminar ou reduzir a probabilidade de um ataque bem-sucedido. O controle compensatório é um substituto para um controle principal.",
  },
  {
    id: 13,
    category: "Descoberta de Rede",
    question:
      "Uma equipe de cibersegurança realiza uma avaliação de segurança da infraestrutura de rede de uma grande empresa. A equipe decide usar uma abordagem de descoberta passiva para identificar sistemas, serviços e protocolos em uso na rede. Qual dos seguintes métodos de descoberta passiva seria o mais eficaz e como funciona?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Realizar uma varredura ativa da rede para identificar hosts e serviços", correct: false },
      { letter: "B", text: "Inspecionar o tráfego de rede usando um sniffer de pacotes para identificar protocolos em uso e padrões de tráfego", correct: true },
      { letter: "C", text: "Realizar uma varredura de vulnerabilidade de rede para identificar portas abertas e serviços em execução", correct: false },
      { letter: "D", text: "Usar um scanner de portas para identificar sistemas e serviços que respondem a solicitações de rede", correct: false },
    ],
    explanation:
      "A captura de pacotes de rede é um exemplo de descoberta passiva que pode revelar informações sobre hosts conectados à rede, canais de comunicação, protocolos em uso e padrões de atividade. Sniffers de pacotes capturam e analisam o tráfego de rede. A varredura de vulnerabilidades de rede é uma abordagem ativa, enviando pacotes para hosts. A varredura de portas também é uma abordagem ativa. Varreduras ativas funcionam enviando pacotes e analisando as respostas.",
  },
  {
    id: 14,
    category: "Controles de Segurança",
    question:
      "Um gerente de suporte está dando treinamento essencial de segurança para a central de ajuda. Qual classe de controle o gerente de suporte está implementando?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Detetivo", correct: false },
      { letter: "B", text: "Operacional", correct: true },
      { letter: "C", text: "Gerencial", correct: false },
      { letter: "D", text: "Técnico", correct: false },
    ],
    explanation:
      "Controles operacionais são implementados e executados principalmente por pessoas (em oposição a sistemas). Por exemplo, guardas de segurança e programas de treinamento são exemplos de controles operacionais. Firewalls, antivírus e modelos de controle de acesso do OS são exemplos de controles técnicos. Controles detetivos são medidas tomadas para detectar e responder a incidentes. Um controle gerencial fornece supervisão do sistema de informação.",
  },
  {
    id: 15,
    category: "Controles de Segurança",
    question:
      "Uma organização sofreu recentemente um ataque que resultou em perda de dados do sistema. O administrador do sistema deve agora restaurar o sistema com um backup de dados. Qual controle de segurança funcional o administrador conseguiu implementar?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Responsivo", correct: false },
      { letter: "B", text: "Compensatório", correct: false },
      { letter: "C", text: "Corretivo", correct: true },
      { letter: "D", text: "Preventivo", correct: false },
    ],
    explanation:
      "O administrador usou um controle corretivo após o ataque. Um bom exemplo de controle corretivo é um sistema de backup que pode restaurar dados danificados por um atacante durante uma intrusão. Controles preventivos atuam para eliminar ou reduzir a probabilidade de um ataque bem-sucedido. Controles responsivos servem para direcionar ações corretivas após a confirmação do incidente. O controle compensatório é um substituto para um controle principal.",
  },
  {
    id: 16,
    category: "Manutenção",
    question:
      "Uma equipe de suporte está se preparando para uma janela de manutenção futura. Quais tarefas a equipe de suporte deve realizar durante as janelas de manutenção proativa? (Selecione as três melhores opções.)",
    multipleChoice: true,
    selectCount: 3,
    options: [
      { letter: "A", text: "Analisar eventos", correct: true },
      { letter: "B", text: "Reiniciar dispositivos", correct: true },
      { letter: "C", text: "Implementar patches não testados", correct: false },
      { letter: "D", text: "Restaurar serviços críticos após um teste de backup", correct: true },
    ],
    explanation:
      "Dispositivos são frequentemente reiniciados durante janelas de manutenção para aplicar atualizações, redefinir conexões e atualizar sistemas. Analisar eventos durante a manutenção é importante para identificar irregularidades que podem indicar problemas. Restaurar serviços críticos após um teste de backup pode ser parte de uma estratégia de manutenção proativa. Embora a implementação de patches seja crucial, tipicamente não é feita durante a janela de manutenção sem testes prévios.",
  },
  {
    id: 17,
    category: "Controles de Segurança",
    question:
      "Um gerente de risco recém-contratado está assumindo as responsabilidades de controle operacional da organização. Qual responsabilidade de controle o gerente de risco assumiria em um ambiente de cibersegurança?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Configurar dispositivos de rede para sincronizar tempo usando Network Time Protocol (NTP)", correct: false },
      { letter: "B", text: "Criptografia de dados sensíveis durante armazenamento e transmissão", correct: false },
      { letter: "C", text: "Condução de verificações de antecedentes em novos funcionários", correct: true },
      { letter: "D", text: "Implementação de firewalls e sistemas de detecção de intrusão", correct: false },
    ],
    explanation:
      "Pessoas implementam controles operacionais, como políticas, procedimentos e programas de treinamento. Por exemplo, conduzir verificações de antecedentes em novos funcionários é um exemplo de controle operacional em cibersegurança, pois seleciona potenciais contratados por atividades criminais passadas, reduzindo ameaças internas. A implementação de algoritmos criptográficos é um controle técnico. Firewalls e sistemas de detecção de intrusão são controles técnicos. A sincronização de tempo via NTP é um controle técnico.",
  },
  {
    id: 18,
    category: "Gestão de Risco",
    question:
      "Um diretor de TI revisa uma auditoria de cibersegurança e descobre que um servidor de contabilidade antigo está significativamente fora de conformidade. Em vez de tentar reparos, o diretor conclui que descomissionar o servidor é o curso de ação mais seguro. Qual é o princípio de gestão de risco que o diretor de TI está seguindo?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Transferência de risco", correct: false },
      { letter: "B", text: "Aceitação de risco", correct: false },
      { letter: "C", text: "Evasão de risco", correct: true },
      { letter: "D", text: "Mitigação de risco", correct: false },
    ],
    explanation:
      "O diretor está seguindo a evasão de risco devido ao risco e custo de trazer o servidor para conformidade. A evasão de risco frequentemente significa que a empresa interrompe a atividade geradora de risco. A aceitação de risco significa que a empresa continua a operar sem mudanças. A mitigação de risco é quando uma empresa reduz a exposição implementando controles mitigadores. A transferência de risco significa atribuir o risco a um terceiro.",
  },
  {
    id: 19,
    category: "Change Management",
    question:
      "Um profissional de TI é responsável pelo gerenciamento de patches e configuração de sua organização. A organização designou o profissional a tarefa de garantir que a aplicação de patches e mudanças de configuração sejam concluídas de forma segura e eficiente. O profissional também é responsável por garantir que planos de reversão estejam em caso de problemas. Qual das seguintes declarações é verdadeira sobre as responsabilidades do profissional de TI para gerenciar os planos de reversão necessários?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Planos de reversão são necessários para aplicação de patches e mudanças de configuração durante janelas de manutenção", correct: true },
      { letter: "B", text: "Planos de reversão não são necessários para aplicação de patches durante janelas de manutenção", correct: false },
      { letter: "C", text: "Planos de reversão são necessários apenas para tarefas de manutenção reativa", correct: false },
      { letter: "D", text: "Planos de reversão só podem ser feitos manualmente", correct: false },
    ],
    explanation:
      "As equipes de gerenciamento de patches contam com janelas de manutenção para concluir as implantações. No entanto, a política de gerenciamento de mudanças dita que a aplicação de patches deve terminar rápido o suficiente para acomodar planos de reversão se ocorrerem problemas. Planos de reversão são necessários durante janelas de manutenção. O profissional pode completar reversões manual e automaticamente. Planos de reversão devem estar em vigor tanto para tarefas de manutenção reativas quanto proativas.",
  },
  {
    id: 20,
    category: "Gestão de Risco",
    question:
      "Um administrador de sistemas executa uma varredura em um servidor de aplicação e encontra várias vulnerabilidades. Os problemas não são graves e patches estão disponíveis em cada caso. O administrador decidiu instalar os patches disponíveis. Qual princípio de gestão de risco eles demonstraram?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Evasão de risco", correct: false },
      { letter: "B", text: "Transferência de risco", correct: false },
      { letter: "C", text: "Mitigação de risco", correct: true },
      { letter: "D", text: "Aceitação de risco", correct: false },
    ],
    explanation:
      "O administrador está praticando mitigação de risco ao instalar os patches e reduzir as vulnerabilidades. A mitigação de risco é quando uma empresa reduz a exposição a itens de risco implementando controles mitigadores. A aceitação de risco significa continuar a operar sem mudanças. A evasão de risco significa interromper a atividade geradora de risco. A transferência de risco significa atribuir o risco a um terceiro.",
  },
  {
    id: 21,
    category: "Gestão de Risco",
    question:
      "A equipe de assuntos jurídicos de um conglomerado internacional opta por atribuir certos riscos a um terceiro. Qual princípio de gestão de risco eles estão implementando?",
    multipleChoice: false,
    options: [
      { letter: "A", text: "Mitigação de risco", correct: false },
      { letter: "B", text: "Evasão de risco", correct: false },
      { letter: "C", text: "Transferência de risco", correct: true },
      { letter: "D", text: "Aceitação de risco", correct: false },
    ],
    explanation:
      "A transferência de risco (ou compartilhamento) significa que a empresa atribuiria o risco a um terceiro, tipicamente através de apólices de seguro. O seguro transfere riscos financeiros para um terceiro. A aceitação de risco significa continuar a operar sem mudanças. A evasão de risco significa interromper a atividade geradora de risco. A mitigação de risco é quando uma empresa reduz a exposição implementando controles mitigadores.",
  },
];
