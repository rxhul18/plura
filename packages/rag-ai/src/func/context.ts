import { ragAi } from "../init";

async function ragAiAddPDFContext(filePath: string, namespace: string) {
    await ragAi.context.add({
        type: "pdf",
        fileSource: filePath,
        options: { namespace: namespace },
      });
}

async function ragAiAddTEXTContext(text: string, namespace: string) {
    await ragAi.context.add({
        type: "text",
        data: text,
        options: { namespace: namespace },
      });
}

async function ragAiAddWEBContext(link: string, namespace: string) {
    await ragAi.context.add({
        type: "html",
        source: link,
        config: { chunkOverlap: 50, chunkSize: 200 },
        options: { namespace: namespace },
      });
}

async function ragAiRemoveContext(id:string, namespace: string) {
    await ragAi.context.delete({ id: id, namespace: namespace });
}

export {
    ragAiAddPDFContext,
    ragAiAddTEXTContext,
    ragAiAddWEBContext,
    ragAiRemoveContext
}