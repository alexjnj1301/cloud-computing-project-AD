<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chats = Chat::all();
        return response()->json($chats);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'chat_ref' => 'required|string|max:255',
            'user_id' => 'required|integer',
        ],
        [
            'chat_ref.required' => 'The chat reference is required.',
            'user_id.required' => 'The user ID is required.',
        ]);

        $chat = Chat::create($validated);

        return response()->json($chat, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $chats = Chat::where('user_id', $user_id)->get();
        return response()->json($chats);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat)
    {
        $validated = $request->validate([
            'chat_ref' => 'sometimes|required|string|max:255',
            'user_id' => 'sometimes|required|integer',
            'picture' => 'nullable|string|max:255',
        ]);

        $chat->update($validated);

        return response()->json($chat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Trouver le message par ID
        $chat = Chat::findOrFail($id);

        // Supprimer le message
        $chat->delete();

        return response()->json(['message' => 'Chat deleted successfully']);
    }
}
