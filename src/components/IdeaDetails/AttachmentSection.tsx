import { FC, useRef } from 'react';
import { Download, Eye, FileText, Plus, Trash2, Upload } from 'lucide-react';
import { Attachment } from '../../types/idea';

interface AttachmentSectionProps {
  attachments: Attachment[];
  onAddAttachment: (file: File) => void;
  onRemoveAttachment: (id: string) => void;
  onViewAttachment: (attachment: Attachment) => void;
  onDownloadAttachment: (attachment: Attachment) => void;
}

export const AttachmentSection: FC<AttachmentSectionProps> = ({
  attachments,
  onAddAttachment,
  onRemoveAttachment,
  onViewAttachment,
  onDownloadAttachment,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAddAttachment(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Attachments</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 text-primary bg-white dark:bg-gray-800 border border-primary rounded-lg hover:bg-primary/5"
        >
          <Upload className="h-4 w-4" />
          Add Attachment
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
        />
      </div>

      <div className="space-y-2">
        {attachments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700">
            <Plus className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-muted-foreground text-center">
              No attachments yet. Click "Add Attachment" to upload files.
            </p>
          </div>
        ) : (
          attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="text-foreground">{attachment.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({formatFileSize(attachment.size)})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewAttachment(attachment)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDownloadAttachment(attachment)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};