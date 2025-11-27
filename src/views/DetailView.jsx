import React from 'react';
import JobHeader from '../components/detail/JobHeader';
import CompetencyLevel from '../components/detail/CompetencyLevel';
import ChatAssistant from '../components/chat/ChatAssistant';

const DetailView = ({
  jobData,
  handleBack,
  onGenerateQuiz,
  onGenerateRoadmap,
  chatHistory,
  chatInput,
  setChatInput,
  handleSendChat,
  chatLoading,
}) => {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slideUp">
      {/* Left Column: Job Info & Content */}
      <div className="lg:col-span-2 space-y-8">
        <JobHeader
          title={jobData.title}
          description={jobData.description}
          onBack={handleBack}
        />

        {['Basic', 'Intermediate', 'Expert'].map((level) => (
          <CompetencyLevel
            key={level}
            level={level}
            skills={jobData.levels[level] || []}
            onGenerateQuiz={onGenerateQuiz}
            onGenerateRoadmap={onGenerateRoadmap}
          />
        ))}
      </div>

      {/* Right Column: Chat Assistant (Sticky) */}
      <div className="lg:col-span-1">
        <ChatAssistant
          jobData={jobData}
          history={chatHistory}
          input={chatInput}
          setInput={setChatInput}
          onSend={handleSendChat}
          loading={chatLoading}
        />
      </div>
    </div>
  );
};

export default DetailView;
