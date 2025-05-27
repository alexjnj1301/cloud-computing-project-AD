<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::all();
        return response()->json($files);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|integer',
            'user_id' => 'required|integer',
            'type' => 'required|string|max:255',
            'path' => 'required|string|max:1024',
        ], [
            'name.required' => 'The name is required.',
            'project_id.required' => 'The project ID is required.',
            'user_id.required' => 'The user ID is required.',
            'type.required' => 'The type is required.',
            'path.required' => 'The path is required.',
        ]);

        $file = File::create($validated);

        return response()->json($file, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(File $file)
    {
        $file->delete();
        return response()->json(null, 204);
    }

    // get file by project_id
    public function getFilesByProjectId($projectId)
    {
        $files = File::where('project_id', $projectId)->get();
        return response()->json($files);
    }
}
