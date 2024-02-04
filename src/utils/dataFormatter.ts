import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function dateFormatter(date: string) {
  return format(parseISO(date), 'd MMMM yy', { locale: ptBR })
}