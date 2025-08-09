"use client";

import { useState, ChangeEvent } from "react";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import Input from "../ui/input";
import Label from "../ui/label";
import { Loader2, Save, Trash2, Copy } from "lucide-react";
import { generatePostDraft } from "../../lib/ai/generatePostDraft";

export default function ZephyriumAIEditor() {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const MAX_TITLE_LENGTH = 100;
  const MAX_PROMPT_LENGTH = 500;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate content");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await generatePostDraft(prompt);
      setDraft(result);
      setSuccess("Draft generated successfully!");
    } catch (err) {
      console.error("Error generating post:", err);
      setError("Failed to generate draft. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !draft.trim()) {
      setError("Please provide both title and content");
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess("Draft saved successfully!");
    } catch (err) {
      console.error("Error saving draft:", err);
      setError("Failed to save draft. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setTitle("");
    setPrompt("");
    setDraft("");
    setError(null);
    setSuccess(null);
  };

  const handleCopy = async () => {
    if (!draft) return;
    
    try {
      await navigator.clipboard.writeText(draft);
      setSuccess("Content copied to clipboard!");
    } catch (err) {
      setError("Failed to copy content");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border rounded-lg p-6 bg-card">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Zephyrium AI Content Generator</h2>
            <p className="text-sm text-muted-foreground">
              Generate high-quality blog posts using AI
            </p>
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              placeholder="Enter post title (e.g., The Future of Cybersecurity)"
              maxLength={MAX_TITLE_LENGTH}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/{MAX_TITLE_LENGTH} characters
            </p>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Topic/Prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
              placeholder="Describe what you want to write about (e.g., How to implement zero-trust architecture in cloud environments)"
              className="min-h-[120px]"
              maxLength={MAX_PROMPT_LENGTH}
            />
            <p className="text-xs text-muted-foreground">
              {prompt.length}/{MAX_PROMPT_LENGTH} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !prompt.trim()}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Draft"
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleClear}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Messages */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          {/* Generated Content */}
          {draft && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Generated Content</Label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-8 px-2"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    disabled={saving || !title.trim()}
                    className="h-8 px-2"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/50">
                <Textarea
                  value={draft}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Generated content will appear here..."
                />
              </div>
              
              <div className="text-xs text-muted-foreground">
                {draft.length} characters
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
