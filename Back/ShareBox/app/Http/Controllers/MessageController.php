<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer tous les messages
        $messages = Message::all();
        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validated = $request->validate([
            'sender' => 'required|string|max:255',
            'content' => 'required|string',
            'chat_id' => 'required|integer',
        ],
        [
            'sender.required' => 'The sender is required.',
            'content.required' => 'The content is required.',
            'chat_id.required' => 'The chat ID is required.',
        ]);

        // Créer un nouveau message
        $message = Message::create($validated);

        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($chat_id)
    {
        // Récupérer les messages pour un chat spécifique
        $messages = Message::where('chat_id', $chat_id)->get();
        return response()->json($messages);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        // Valider les données
        $validated = $request->validate([
            'sender' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'chat_id' => 'sometimes|required|integer',
        ]);

        // Mettre à jour le message
        $message->update($validated);

        return response()->json($message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le message par ID
        $message = Message::findOrFail($id);

        // Supprimer le message
        $message->delete();

        return response()->json(['message' => 'Message deleted successfully']);
    }
}
