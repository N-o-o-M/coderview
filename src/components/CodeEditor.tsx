import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import { Editor } from "@monaco-editor/react";

export const CodeEditor = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(
    LANGUAGES[0].id
  );
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);

  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setCode(question.starterCode[language]);
    }
  };
  const handleLanguageChange = (lang: "javascript" | "python" | "java") => {
    setLanguage(lang);
    setCode(selectedQuestion.starterCode[lang]);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[calc(100vh-4rem-1px)]"
    >
      {/* Question Section */}
      <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
        <ScrollArea className="h-full">
          <div className="p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      {selectedQuestion.title}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred language and start coding!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Select
                    value={selectedQuestion.id}
                    onValueChange={handleQuestionChange}
                  >
                    <SelectTrigger className="w-full sm:w-[180px] cursor-pointer hover:bg-accent/50 transition-colors">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          {selectedQuestion.title}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {CODING_QUESTIONS.map((q) => (
                        <SelectItem
                          key={q.id}
                          value={q.id}
                          className="cursor-pointer hover:bg-accent focus:bg-accent focus:text-accent-foreground"
                        >
                          {q.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Language selection */}
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full sm:w-[150px] cursor-pointer hover:bg-accent/50 transition-colors">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${language}.png`}
                            alt={language}
                            className="size-5 object-contain"
                          />
                          {LANGUAGES.find((lang) => lang.id === language)?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem
                          key={lang.id}
                          value={lang.id}
                          className="cursor-pointer hover:bg-accent focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={`/${lang.id}.png`}
                              alt={lang.name}
                              className="size-5 object-contain"
                            />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Problem description */}
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <BookIcon className="size-5 text-primary/80" />
                    <CardTitle>Problem Description</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">
                      {selectedQuestion.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {/* Problem Examples */}
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader className="hover:bg-accent/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <LightbulbIcon className="size-5 text-yellow-500" />
                    <CardTitle>Examples</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-full w-full rounded-md border">
                    <div className="p-4 space-y-4">
                      {selectedQuestion.examples.map((example, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-medium text-sm">
                            Example {index + 1}:
                          </p>
                          <ScrollArea className="h-full w-full rounded-md">
                            <pre className="bg-muted/50 p-3 rounded-lg text-sm font-mono hover:bg-muted/70 transition-colors">
                              <div>Input: {example.input}</div>
                              <div>Output: {example.output}</div>
                              {example.explanation && (
                                <div>Explanation: {example.explanation}</div>
                              )}
                            </pre>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </div>
                      ))}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </CardContent>
              </Card>
              {/* Constraints */}
              {selectedQuestion.constraints && (
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-2">
                      <AlertCircleIcon className="size-5 text-blue-500" />
                      <CardTitle>Constraints</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                      {selectedQuestion.constraints.map((constraint, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="hover:bg-primary/20 transition-colors"
      />
      {/* Code Editor */}
      <ResizablePanel defaultSize={60} minSize={30} maxSize={70}>
        <div className="h-full relative">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: {
                top: 16,
                bottom: 16,
              },
              wordWrap: "on",
              wrappingIndent: "indent",
              formatOnPaste: true,
              formatOnType: true,
              smoothScrolling: true,
              cursorSmoothCaretAnimation: "on",
              cursorBlinking: "smooth",
              renderLineHighlight: "all",
              selectionHighlight: true,
              bracketPairColorization: {
                enabled: true,
              },
            }}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
