import { useState } from 'react';
import './style.css';

import { serverFunctions } from '../../utils/serverFunctions';

const response = {
  result: [
    {
      title: 'Кандидат на вакансию',
      content: [
        'Вакансия: .Net разработчик',
        'Дата: 30 августа 2024',
        'Имя: Афонин Константин Валерьевич',
        'Пол: Мужчина',
        'Проживает: Ростов-на-Дону',
        'Гражданство: Россия',
        'Разрешение на работу: Россия',
        'Готовность к переезду: не готов',
        'Готовность к командировкам: готов',
      ],
    },
    {
      title: 'Желаемая должность и зарплата',
      content: [
        'Должность: Fullstack C#/ .Net Core developer',
        'Специализация: Программист, разработчик',
        'Занятость: полная занятость',
        'График работы: удаленная работа',
        'Желательное время в пути до работы: не имеет значения',
      ],
    },
    {
      title: 'Опыт работы',
      content: [
        'Общий опыт: 17 лет 9 месяцев',
        'Джемтех (Ноябрь 2022 — Июнь 2024): веб-разработчик, портал автоматизации взысканий',
        'Dynata, Inc. (Май 2012 — Ноябрь 2022): C#/ Asp.Net developer, поддержка приложения для анализа статистических данных',
        'SoftGrad Solutions (Сентябрь 2010 — Апрель 2012): Asp.Net MVC Developer, автоматизация HR компаний группы Ericsson',
        'NIIAS (Апрель 2006 — Февраль 2010): Lead engineer-programmer, автоматизация системы на железнодорожных коммуникациях',
      ],
    },
    {
      title: 'Образование',
      content: [
        'Высшее образование',
        '2010: Ростовский университет путей сообщения, Автоматизация, Телекоммуникация, PhD',
        '2007: Ростовский университет путей сообщения, Автоматизация, Телекоммуникация',
      ],
    },
    {
      title: 'Ключевые навыки',
      content: [
        'Знание языков: Русский (родной), Английский (C1 — продвинутый)',
        'Навыки: ASP.NET, Git, C#, SVN, HTML, MS SQL, jQuery, Ajax, JavaScript',
        '.NET Framework, CSS, SQL, MVC, Visual Studio C#, XML, ООП',
        'Разработка ПО, Windows Forms, WPF, WCF, XAML, MAUI, Xamarin, Angular',
      ],
    },
    {
      title: 'Дополнительная информация',
      content: ['Имеется собственный автомобиль', 'Права категории: B, C'],
    },
    {
      title: 'Рекомендации',
      content: ['Milena, Inc.', 'Mikhail Sheyner (President)'],
    },
    {
      title: 'Обо мне',
      content: [
        'ASP.Net, MS-SQL, jQuery, TypeScript, Ajax, HTML, SVN, Git, Jira',
      ],
    },
  ],
};

export type Slide = {
  title: string;
  content: string[];
};

const mockRequest = () =>
  new Promise<{ result: Slide[] }>((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });

const UploadSidebar = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setUploadProgress(0);
    } else {
      console.error('Failed file upload');
    }
  };

  const createNewSlides = (slides: Slide[]) => {
    serverFunctions
      .createSlidesFromData(slides)
      .catch(alert)
      .finally(() => {
        setFile(undefined);
      });
  };

  const handleGenerateSlides = async () => {
    if (!file) return;

    setIsLoading(true);
    setUploadProgress(20);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // const response = await fetch(
      //   'http://62.113.100.201/api/upload',
      //   {
      //     method: 'POST',
      //     body: formData,
      //   }
      // );

      // if (response.ok) throw new Error('Failed to fetch slides content');

      // const data = await response.json();
      const data = await mockRequest();
      createNewSlides(data.result);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error sending file:', error);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="pdf-uploader">
      {uploadProgress > 0 && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
      <h2>Upload pdf to generate slides</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        onClick={handleGenerateSlides}
        disabled={!file || isLoading}
        className="generate-button"
      >
        {isLoading ? <span className="loader"></span> : 'Generate slides'}
      </button>
    </div>
  );
};

export default UploadSidebar;
