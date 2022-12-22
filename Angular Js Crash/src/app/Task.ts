export interface Task {
    id?: number; // 물음표는 선택사항
    text: string;
    day: string;
    reminder: boolean;
}