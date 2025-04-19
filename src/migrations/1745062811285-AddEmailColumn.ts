import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailColumn implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Add nullable email column first
        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD COLUMN "email" character varying
        `);

        // Step 2: Generate temporary emails for existing users
        await queryRunner.query(`
            UPDATE "user" 
            SET "email" = 'user_' || id || '@temp.com'
        `);

        // Step 3: Add constraints
        await queryRunner.query(`
            ALTER TABLE "user" 
            ALTER COLUMN "email" SET NOT NULL
        `);
        
        await queryRunner.query(`
            ALTER TABLE "user" 
            ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")
        `);

        // Step 4: Add lowercase transformer
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION lowercase_email()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.email := LOWER(NEW.email);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER user_email_lowercase
            BEFORE INSERT OR UPDATE ON "user"
            FOR EACH ROW EXECUTE FUNCTION lowercase_email();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS user_email_lowercase ON "user"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS lowercase_email`);
    }
}