-- Add admin user (replace with your email)
INSERT INTO "Admin" (id, email, "createdAt") 
VALUES (gen_random_uuid(), 'dhruv@example.com', NOW());

-- Add some test colleges
INSERT INTO "College" (name, email, website, description, category, city, state, score, "voteCount", "createdAt", "updatedAt")
VALUES 
  ('IIT Delhi', 'info@iitd.ac.in', 'https://home.iitd.ac.in', 'Premier engineering institute in Delhi', 'Engineering', 'New Delhi', 'Delhi', 0, 0, NOW(), NOW()),
  ('IIT Bombay', 'info@iitb.ac.in', 'https://www.iitb.ac.in', 'Leading technical university in Mumbai', 'Engineering', 'Mumbai', 'Maharashtra', 0, 0, NOW(), NOW()),
  ('AIIMS Delhi', 'info@aiims.edu', 'https://www.aiims.edu', 'Top medical institute in India', 'Medical', 'New Delhi', 'Delhi', 0, 0, NOW(), NOW()),
  ('St. Stephens College', 'principal@ststephens.edu', 'https://www.ststephens.edu', 'Premier arts and science college', 'Arts', 'New Delhi', 'Delhi', 0, 0, NOW(), NOW()),
  ('BITS Pilani', 'info@bits-pilani.ac.in', 'https://www.bits-pilani.ac.in', 'Renowned private engineering institute', 'Engineering', 'Pilani', 'Rajasthan', 0, 0, NOW(), NOW()),
  ('IIM Ahmedabad', 'info@iima.ac.in', 'https://www.iima.ac.in', 'Top management institute in India', 'Management', 'Ahmedabad', 'Gujarat', 0, 0, NOW(), NOW()),
  ('Delhi University', 'info@du.ac.in', 'https://www.du.ac.in', 'Central university with multiple colleges', 'Arts', 'New Delhi', 'Delhi', 0, 0, NOW(), NOW()),
  ('IIT Madras', 'info@iitm.ac.in', 'https://www.iitm.ac.in', 'Top ranked IIT in Chennai', 'Engineering', 'Chennai', 'Tamil Nadu', 0, 0, NOW(), NOW()),
  ('NIT Trichy', 'info@nitt.edu', 'https://www.nitt.edu', 'National Institute of Technology', 'Engineering', 'Tiruchirappalli', 'Tamil Nadu', 0, 0, NOW(), NOW()),
  ('Jadavpur University', 'info@jadavpuruniversity.in', 'https://www.jadavpuruniversity.in', 'Premier state university in Kolkata', 'Engineering', 'Kolkata', 'West Bengal', 0, 0, NOW(), NOW());
