def serialize_doc(doc):

    if doc is None:
        return None

    doc["_id"] = str(doc["_id"])

    return doc


def serialize_docs(docs):

    return [serialize_doc(doc) for doc in docs]