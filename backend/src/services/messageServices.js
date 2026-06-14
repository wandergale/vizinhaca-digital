class MessageServices {
    static async sendMessage(actionId, subject, content, link, attachment) {
        const message = await prisma.message.create({
            data: {
                actionId,
                subject,
                content,
                link,
                attachment,
            },
        });

        return message;
    }

    static async listMessages() {
        // lógica para listar mensagens
        const messages = await prisma.message.findMany({});
        return messages;
    }

    static async getMessage(id) {
        // lógica para buscar mensagem por ID
        const message = await prisma.message.findUnique({ where: { id } });
        if (!message) {
            throw new AppError(`Mensagem com ID ${id} não encontrada`, 404);
        }
        return message;
    }

    static async getMessagesByAction(actionId) {
        // lógica para buscar mensagens por ID da ação
        const messages = await prisma.message.findMany({ where: { actionId } });
        return messages;
    }
}

module.exports = MessageServices;