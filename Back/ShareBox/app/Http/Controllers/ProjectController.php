<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
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
            'team_id' => 'required|integer',
            'user_id' => 'required|integer',
            'picture' => 'nullable|string|max:255',
        ],
        [
            'name.required' => 'The project name is required.',
            'team_id.required' => 'The team ID is required.',
            'user_id.required' => 'The user ID is required.',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        // get files associated with the project
        $project->files = $project->files()->get();

        return response()->json($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }

    // projects by team_id
    public function projectsByTeamId($teamId)
    {
        $projects = Project::where('team_id', $teamId)->get();
        return response()->json($projects);
    }
}
