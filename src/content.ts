// Public content only. Do not add personal history, accounts, or unpublished research.
// Project descriptions deliberately avoid unverified features, stacks, and outcomes.
export type Project = {
  id: string
  title: string
  category: string
  description: string
  purpose: string
  url: string
  domain: string
  visual: 'language' | 'research'
  features: string[]
  accessNote?: string
}

export type PublicNote = {
  id: string
  date: string
  title: string
  summary: string
}

export const content = {
  name: 'HawkPP',
  subtitle: '作品与探索',
  introduction: '把想法做成作品，\n把探索留在这里。',
  description: '这里收录我的公开项目，以及还在继续的探索。',
  projects: [
    {
      id: 'cet6',
      title: '六级学习网站',
      category: '学习工具',
      description: '把生词积累、日常复习与翻译练习放在一起，为六级备考提供一个持续使用的学习空间。',
      purpose: '让零散的词汇学习有处可寻，也让复习成为积累的一部分。',
      url: 'https://cet6.hawkpp2025.com/',
      domain: 'cet6.hawkpp2025.com',
      visual: 'language',
      features: ['生词积累', '日常复习', '翻译练习'],
    },
    {
      id: 'research',
      title: '研途 · 科研工作台',
      category: '科研工具',
      description: '面向科研过程的工作台，围绕学习路线、任务反馈、研究记录与资料整理展开。',
      purpose: '为分散的任务与研究线索提供一个共同的入口，方便持续跟进。',
      url: 'https://research.hawkpp2025.com/',
      domain: 'research.hawkpp2025.com',
      visual: 'research',
      features: ['学习路线', '任务反馈', '研究记录'],
      accessNote: '需登录使用',
    },
  ] satisfies Project[],
  ongoing: {
    title: '抗量子密码应用智能体',
    description: '探索智能体在抗量子密码应用场景中的可能性。项目仍在研究中。',
    status: '在研',
  },
  about: {
    title: '作品是一个起点，\n也是探索的记录。',
    paragraphs: [
      '你好，我是 HawkPP。这个网站是放置作品和想法的地方：有已经可以打开的项目，也有还在推进的尝试。',
      '我希望留下的不只是一个链接，也包括它为什么被做出来。随着作品慢慢完善，这里也会持续更新。',
    ],
  },
  // Leave empty until real, explicitly public updates are available.
  // Example shape: { id, date: 'YYYY-MM-DD', title, summary }.
  notes: [] as PublicNote[],
}
