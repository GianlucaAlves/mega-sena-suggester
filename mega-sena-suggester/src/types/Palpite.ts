export type Palpite = {
    id: string;
    numeros: number[];
    tipo: 'manual' | 'automatico';
    data: string;
}