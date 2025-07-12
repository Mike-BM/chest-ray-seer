
import { useState } from 'react';
import { Upload, Activity, Brain, FileImage, AlertCircle, CheckCircle, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface PredictionResult {
  diagnosis: 'Pneumonia' | 'Normal';
  confidence: number;
  timestamp: string;
}

const PneumoniaDetector = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Mock model performance metrics
  const modelMetrics = {
    accuracy: 95.3,
    precision: 94.7,
    recall: 96.1,
    f1Score: 95.4
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock prediction - in real implementation, this would call your trained model
      const mockPrediction: PredictionResult = {
        diagnosis: Math.random() > 0.3 ? 'Normal' : 'Pneumonia',
        confidence: Math.random() * 30 + 70, // 70-100% confidence
        timestamp: new Date().toLocaleString()
      };
      
      setResult(mockPrediction);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AI Pneumonia Detection</h1>
          </div>
          <p className="text-lg text-gray-600">Upload a chest X-ray image for AI-powered pneumonia screening</p>
        </div>

        {/* Model Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{modelMetrics.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{modelMetrics.precision}%</div>
              <div className="text-sm text-gray-600">Precision</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{modelMetrics.recall}%</div>
              <div className="text-sm text-gray-600">Recall</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{modelMetrics.f1Score}%</div>
              <div className="text-sm text-gray-600">F1-Score</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Chest X-Ray
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileImage className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">Click to upload X-ray image</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {selectedImage && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-gray-700">
                    Selected: {selectedImage.name}
                  </div>
                  <Button 
                    onClick={analyzeImage} 
                    disabled={isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Analyze X-Ray
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="X-ray preview" 
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="text-white text-center">
                        <Activity className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p>AI Analysis in Progress...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {result && (
                <div className="space-y-4">
                  <Alert className={result.diagnosis === 'Pneumonia' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
                    <div className="flex items-center gap-2">
                      {result.diagnosis === 'Pneumonia' ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      <AlertDescription className="font-medium">
                        <div className="flex items-center justify-between">
                          <span>Diagnosis: {result.diagnosis}</span>
                          <Badge variant={result.diagnosis === 'Pneumonia' ? 'destructive' : 'default'}>
                            {result.diagnosis}
                          </Badge>
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span className="font-medium">{result.confidence.toFixed(1)}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-2" />
                  </div>

                  <div className="text-xs text-gray-500 border-t pt-2">
                    Analysis completed at {result.timestamp}
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Medical Disclaimer:</strong> This AI system is for screening purposes only. 
                      Always consult with a qualified healthcare professional for medical diagnosis and treatment decisions.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {!imagePreview && !isAnalyzing && (
                <div className="text-center text-gray-500 py-8">
                  <FileImage className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Upload an X-ray image to begin analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Technical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Architecture</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Lightweight CNN with 3 convolutional layers</li>
                  <li>• Input size: 150x150 pixels</li>
                  <li>• Binary classification output</li>
                  <li>• Optimized for mobile deployment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Training Details</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dataset: 5,863 X-ray images</li>
                  <li>• Data augmentation applied</li>
                  <li>• Adam optimizer, binary crossentropy loss</li>
                  <li>• Validated on independent test set</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PneumoniaDetector;
