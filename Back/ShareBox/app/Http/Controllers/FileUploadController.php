<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    /**
     * Upload a file to S3.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

     public function uploadFile(Request $request)
     {
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,docx|max:10240',
            'project_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $originalName = $request->file('file')->getClientOriginalName();
        $name = pathinfo($originalName, PATHINFO_FILENAME);
        $type = pathinfo($originalName, PATHINFO_EXTENSION);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();

            $path = Storage::disk('s3')->putFileAs('uploads', $file, $filename);

            if (!$path) {
                return response()->json(['error' => 'Erreur lors de l\'upload S3'], 500);
            }

            $url = Storage::disk('s3')->url($path);

            $requestData = [
                'name' => $name,
                'project_id' => $request->input('project_id'),
                'user_id' => $request->input('user_id'),
                'type' => $type,
                'path' => $url,
            ];

            // Instancier FileController et appeler store
            $fileController = new \App\Http\Controllers\FileController();
            $file = $fileController->store(new \Illuminate\Http\Request($requestData));

            return response()->json([
                'message' => 'Fichier uploadé avec succès !',
                'url' => $url,
            ]);
        }

        return response()->json(['message' => 'Aucun fichier envoyé'], 400);
    }
}
