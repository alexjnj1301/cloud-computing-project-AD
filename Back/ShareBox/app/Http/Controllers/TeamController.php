<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();
        return response()->json($teams);
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
            'picture' => 'nullable|string|max:1024',
        ], [
            'name.required' => 'The name is required.',
        ]);

        $team = Team::create($validated);

        $team->users()->create([
            'user_id' => auth()->id(),
        ]);

        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Team $team)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        //
    }

    // team by user_id
    public function teamByUserId($userId)
    {
        $teams = Team::whereHas('users', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        return response()->json($teams);
    }

    // add user to team
    public function addUserToTeam(Request $request, $teamId)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
        ], [
            'user_id.required' => 'The user ID is required.',
        ]);

        $team = Team::findOrFail($teamId);

        $exists = $team->users()->where('user_id', $validated['user_id'])->exists();

        if ($exists) {
            return response()->json(['message' => 'User is already in the team.'], 409);
        }

        \App\Models\TeamUser::create([
            'team_id' => $team->id,
            'user_id' => $validated['user_id'],
        ]);

        return response()->json(['message' => 'User added to team successfully.']);
    }

    // Get users by team ID
    public function getUsersByTeamId($teamId)
    {
        $team = Team::findOrFail($teamId);
        $users = $team->users;
        return response()->json($users);
    }

    // remove user from team
    public function removeUserFromTeam(Request $request, $teamId)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
        ], [
            'user_id.required' => 'The user ID is required.',
        ]);

        $team = Team::findOrFail($teamId);
        \App\Models\TeamUser::where('team_id', $team->id)
            ->where('user_id', $validated['user_id'])
            ->delete();

        return response()->json(['message' => 'User removed from team successfully.']);
    }

    // get projects by team ID
    public function projectsByTeamId($teamId)
    {
        $team = Team::findOrFail($teamId);
        $projects = $team->projects;
        return response()->json($projects);
    }
}
