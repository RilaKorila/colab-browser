export type Colab = {
    id: string,
    createdAt: string,
    updatedAt?: string,
    publishedAt?: string,
    revisedAt?: string,
    name: string,
    url: string,
    skill: string[],
    editor?: string
    youtubeURL?: string 
}