<?php

namespace App\Console\Commands;

use App\Models\Form;
use App\Models\User;
use App\Support\Id;
use App\Utils\TicketNumber;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class NmpSeedCommand extends Command
{
    protected $signature = 'nmp:seed';

    protected $description = 'Upsert demo users and a published sample form (MySQL nmp_ticketing)';

    public function handle(): int
    {
        $clientUsers = [
            ['email' => 'user@nmp.gov.ph', 'password' => 'user123', 'name' => 'J Dela Cruz', 'division' => 'FMD'],
            ['email' => 'maria.santos@nmp.gov.ph', 'password' => 'user123', 'name' => 'Maria Santos', 'division' => 'Collections'],
            ['email' => 'juan.reyes@nmp.gov.ph', 'password' => 'user123', 'name' => 'Juan Reyes', 'division' => 'Anthropology'],
            ['email' => 'ana.garcia@nmp.gov.ph', 'password' => 'user123', 'name' => 'Ana Garcia', 'division' => 'Archaeology'],
            ['email' => 'carlo.mendoza@nmp.gov.ph', 'password' => 'user123', 'name' => 'Carlo Mendoza', 'division' => 'Botany'],
            ['email' => 'elena.ramos@nmp.gov.ph', 'password' => 'user123', 'name' => 'Elena Ramos', 'division' => 'Geology'],
            ['email' => 'mark.torres@nmp.gov.ph', 'password' => 'user123', 'name' => 'Mark Torres', 'division' => 'Zoology'],
            ['email' => 'sophia.lim@nmp.gov.ph', 'password' => 'user123', 'name' => 'Sophia Lim', 'division' => 'Fine Arts'],
            ['email' => 'diego.navarro@nmp.gov.ph', 'password' => 'user123', 'name' => 'Diego Navarro', 'division' => 'Maritime'],
            ['email' => 'isabel.cruz@nmp.gov.ph', 'password' => 'user123', 'name' => 'Isabel Cruz', 'division' => 'Library'],
            ['email' => 'patrick.ong@nmp.gov.ph', 'password' => 'user123', 'name' => 'Patrick Ong', 'division' => 'HR'],
            ['email' => 'grace.villanueva@nmp.gov.ph', 'password' => 'user123', 'name' => 'Grace Villanueva', 'division' => 'Finance'],
            ['email' => 'miguel.fernandez@nmp.gov.ph', 'password' => 'user123', 'name' => 'Miguel Fernandez', 'division' => 'Security'],
            ['email' => 'camille.bautista@nmp.gov.ph', 'password' => 'user123', 'name' => 'Camille Bautista', 'division' => 'Education'],
            ['email' => 'rafael.dizon@nmp.gov.ph', 'password' => 'user123', 'name' => 'Rafael Dizon', 'division' => 'Exhibitions'],
        ];

        $adminUsers = [
            ['email' => 'admin@nmp.gov.ph', 'password' => 'admin123', 'name' => 'Ysa Victorio', 'division' => 'ICT'],
            ['email' => 'james.alcantara@nmp.gov.ph', 'password' => 'admin123', 'name' => 'James Alcantara', 'division' => 'ICT'],
            ['email' => 'patricia.mendoza@nmp.gov.ph', 'password' => 'admin123', 'name' => 'Patricia Mendoza', 'division' => 'ICT'],
            ['email' => 'rico.delarosa@nmp.gov.ph', 'password' => 'admin123', 'name' => 'Rico Dela Rosa', 'division' => 'ICT'],
            ['email' => 'nina.castillo@nmp.gov.ph', 'password' => 'admin123', 'name' => 'Nina Castillo', 'division' => 'ICT'],
        ];

        $accounts = [];
        foreach ($adminUsers as $admin) {
            $accounts[] = [...$admin, 'role' => 'admin'];
        }
        $accounts[] = [
            'email' => 'records@nmp.gov.ph',
            'password' => 'records123',
            'name' => 'Record Management',
            'role' => 'record_management',
            'division' => 'Records',
        ];
        foreach ($clientUsers as $client) {
            $accounts[] = [...$client, 'role' => 'user'];
        }

        User::query()->where('role', 'staff')->delete();

        $adminUser = null;
        foreach ($accounts as $account) {
            $email = strtolower($account['email']);
            $user = User::query()->where('email', $email)->first();
            $hash = Hash::make($account['password']);

            if ($user) {
                $user->password_hash = $hash;
                $user->name = $account['name'];
                $user->role = $account['role'];
                $user->division = $account['division'];
                $user->active = true;
                $user->save();
                $this->info("Updated: {$email} ({$account['role']})");
            } else {
                $user = User::create([
                    'id' => Id::newId(),
                    'email' => $email,
                    'password_hash' => $hash,
                    'name' => $account['name'],
                    'role' => $account['role'],
                    'division' => $account['division'],
                    'active' => true,
                ]);
                $this->info("Created: {$email} ({$account['role']})");
            }

            if ($account['role'] === 'admin') {
                $adminUser = $user;
            }
        }

        $publishedExists = Form::query()->where('status', 'published')->exists();
        if (! $publishedExists && $adminUser) {
            Form::create([
                'id' => Id::newId(),
                'title' => 'Technical Assistance Request',
                'description' => 'Request technical assistance from ICT',
                'department' => 'ICT',
                'ref_number' => TicketNumber::generateFormRef(),
                'effectivity' => now()->toDateString(),
                'version' => 'v1.0',
                'status' => 'published',
                'fields' => [
                    ['id' => 'fld_subject', 'type' => 'textbox', 'variable' => 'txt_subject', 'label' => 'Request subject', 'required' => true],
                    ['id' => 'fld_details', 'type' => 'textarea', 'variable' => 'txa_details', 'label' => 'Request details', 'required' => true],
                    ['id' => 'fld_division', 'type' => 'textbox', 'variable' => 'txt_division', 'label' => 'Division / office', 'required' => true],
                    ['id' => 'fld_attachment', 'type' => 'file', 'variable' => 'pdf_attachment', 'label' => 'Supporting document (PDF)', 'required' => false],
                ],
                'signatories' => [['id' => 'sig_1', 'division' => 'IT', 'name' => 'Ysa Victorio']],
                'print_template' => '',
                'print_placements' => [],
                'print_placement_font_size' => 10,
                'work_procedure_name' => '',
                'review_remarks' => '',
                'created_by' => $adminUser->id,
                'updated_by' => $adminUser->id,
            ]);
            $this->info('Created: published Technical Assistance Request form');
        } else {
            $this->info('Skip existing: published form');
        }

        $this->info('Seed complete');

        return self::SUCCESS;
    }
}
