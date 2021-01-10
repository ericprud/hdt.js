interface ProgressListener {
    /**
     * Send progress notification
     * @param level percent of the task accomplished
     * @param message Description of the operation
     */
    notifyProgress(level: number, message: string): void;
}

export default ProgressListener;
