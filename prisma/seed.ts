import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add admin user
  await prisma.admin.create({
    data: {
      email: 'dhruv@example.com',
    },
  })

  // Comprehensive colleges list - Batch 1 of 4
  const colleges = [
    // Andhra Pradesh
    { name: 'IIT Tirupati', website: 'https://iittp.ac.in', description: 'NIRF #57; Top for CSE & Mechanical', category: 'Engineering', city: 'Tirupati', state: 'Andhra Pradesh' },
    { name: 'Andhra Medical College', website: 'https://amcvizag.in', description: 'NIRF #1 in AP; Legacy institution', category: 'Medical', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
    { name: 'Andhra University College of Arts & Commerce', website: 'https://andhrauniversity.edu.in', description: 'NIRF #10; Strong in History & Economics', category: 'Arts', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
    { name: 'SRM University AP', website: 'https://srmap.edu.in', description: 'NIRF #35; Excellent placements', category: 'Management', city: 'Amaravati', state: 'Andhra Pradesh' },
    
    // Arunachal Pradesh
    { name: 'NIT Arunachal Pradesh', website: 'https://nita.ac.in', description: 'NIRF #75; Focus on Civil & CSE', category: 'Engineering', city: 'Yupia', state: 'Arunachal Pradesh' },
    { name: 'Tomo Riba Institute of Health & Medical Sciences', website: 'https://trihms.ac.in', description: 'State flagship; New but growing', category: 'Medical', city: 'Naharlagun', state: 'Arunachal Pradesh' },
    { name: 'Rajiv Gandhi University', website: 'https://rgu.ac.in', description: 'NIRF #101-150; Good for Sociology', category: 'Arts', city: 'Itanagar', state: 'Arunachal Pradesh' },
    { name: 'Himalayan University', website: 'https://himalayanuniversity.in', description: 'Affordable; BBA/MBA focus', category: 'Management', city: 'Itanagar', state: 'Arunachal Pradesh' },
    
    // Assam
    { name: 'IIT Guwahati', website: 'https://iitg.ac.in', description: 'NIRF #7; Elite for all branches', category: 'Engineering', city: 'Guwahati', state: 'Assam' },
    { name: 'Gauhati Medical College', website: 'https://gmchassam.in', description: 'NIRF #44; High patient exposure', category: 'Medical', city: 'Guwahati', state: 'Assam' },
    { name: 'Cotton University', website: 'https://cottonuniversity.ac.in', description: 'NIRF #101-150; Heritage in Humanities', category: 'Arts', city: 'Guwahati', state: 'Assam' },
    { name: 'Assam Don Bosco University', website: 'https://dbuniversity.ac.in', description: 'Private university; Strong management programs', category: 'Management', city: 'Guwahati', state: 'Assam' },
    
    // Bihar
    { name: 'IIT Patna', website: 'https://iitp.ac.in', description: 'NIRF #34; Top for AI & Data Science', category: 'Engineering', city: 'Patna', state: 'Bihar' },
    { name: 'AIIMS Patna', website: 'https://aiimspatna.edu.in', description: 'NIRF #27; Modern facilities', category: 'Medical', city: 'Patna', state: 'Bihar' },
    { name: 'Patna College', website: 'https://patnacollege.ac.in', description: 'Historic; Strong in Philosophy', category: 'Arts', city: 'Patna', state: 'Bihar' },
    { name: 'Patliputra University', website: 'https://ppup.ac.in', description: 'State university; Management programs', category: 'Management', city: 'Patna', state: 'Bihar' },
    
    // Chhattisgarh
    { name: 'NIT Raipur', website: 'https://nitrr.ac.in', description: 'NIRF #70; Good for Mechanical', category: 'Engineering', city: 'Raipur', state: 'Chhattisgarh' },
    { name: 'AIIMS Raipur', website: 'https://aiimsraipur.edu.in', description: 'NIRF #39; New but excellent', category: 'Medical', city: 'Raipur', state: 'Chhattisgarh' },
    { name: 'Pt. Ravishankar Shukla University', website: 'https://prsu.ac.in', description: 'NIRF #101-150; Literature focus', category: 'Arts', city: 'Raipur', state: 'Chhattisgarh' },
    { name: 'OP Jindal University', website: 'https://opju.ac.in', description: 'NIRF #101-125; Industry ties', category: 'Management', city: 'Raigarh', state: 'Chhattisgarh' },
    
    // Goa
    { name: 'NIT Goa', website: 'https://nitgoa.ac.in', description: 'NIRF #90; CSE strong', category: 'Engineering', city: 'Farmagudi', state: 'Goa' },
    { name: 'Goa Medical College', website: 'https://gmcgoa.ac.in', description: 'State flagship; Affordable', category: 'Medical', city: 'Bambolim', state: 'Goa' },
    { name: 'Dempo College of Commerce & Economics', website: 'https://dempocollege.edu.in', description: 'Good for Economics', category: 'Commerce', city: 'Panaji', state: 'Goa' },
    { name: 'BITS Pilani Goa Campus', website: 'https://bits-pilani.ac.in/goa', description: 'NIRF #20; Elite programs', category: 'Engineering', city: 'Vasco da Gama', state: 'Goa' },
    
    // Gujarat
    { name: 'IIT Gandhinagar', website: 'https://iitgn.ac.in', description: 'NIRF #18; Innovation hub', category: 'Engineering', city: 'Gandhinagar', state: 'Gujarat' },
    { name: 'B.J. Medical College', website: 'https://bjmc.gujarat.gov.in', description: 'NIRF #49; High volume', category: 'Medical', city: 'Ahmedabad', state: 'Gujarat' },
    { name: 'Gujarat University', website: 'https://gujaratuniversity.ac.in', description: 'NIRF #101-150; Humanities', category: 'Arts', city: 'Ahmedabad', state: 'Gujarat' },
    { name: 'IIM Ahmedabad', website: 'https://iima.ac.in', description: 'NIRF #1; Global leader', category: 'Management', city: 'Ahmedabad', state: 'Gujarat' },
    
    // Haryana
    { name: 'NIT Kurukshetra', website: 'https://nitkkr.ac.in', description: 'NIRF #58; Electronics focus', category: 'Engineering', city: 'Kurukshetra', state: 'Haryana' },
    { name: 'Pt. B.D. Sharma PGIMS', website: 'https://uhsr.ac.in', description: 'NIRF #49; Comprehensive', category: 'Medical', city: 'Rohtak', state: 'Haryana' },
    { name: 'Kurukshetra University', website: 'https://kuk.ac.in', description: 'NIRF #101-150; History', category: 'Arts', city: 'Kurukshetra', state: 'Haryana' },
    { name: 'MDI Gurgaon', website: 'https://mdi.ac.in', description: 'NIRF #11; Corporate ties', category: 'Management', city: 'Gurgaon', state: 'Haryana' },
    
    // Himachal Pradesh
    { name: 'IIT Mandi', website: 'https://iitmandi.ac.in', description: 'NIRF #72; Research-oriented', category: 'Engineering', city: 'Mandi', state: 'Himachal Pradesh' },
    { name: 'IGMC Shimla', website: 'https://igmcshimla.edu.in', description: 'State top; Affordable', category: 'Medical', city: 'Shimla', state: 'Himachal Pradesh' },
    { name: 'Himachal Pradesh University', website: 'https://hpuniv.ac.in', description: 'NIRF #101-150; Literature', category: 'Arts', city: 'Shimla', state: 'Himachal Pradesh' },
    { name: 'IIM Sirmaur', website: 'https://iimsirmaur.ac.in', description: 'NIRF #98; Emerging', category: 'Management', city: 'Sirmaur', state: 'Himachal Pradesh' },
    
    // Jharkhand
    { name: 'IIT Dhanbad', website: 'https://iitism.ac.in', description: 'NIRF #17; Mining expertise', category: 'Engineering', city: 'Dhanbad', state: 'Jharkhand' },
    { name: 'MGM Medical College', website: 'https://mgmmch.edu.in', description: 'NIRF #48; Clinical strong', category: 'Medical', city: 'Jamshedpur', state: 'Jharkhand' },
    { name: 'Ranchi University', website: 'https://ranchiuniversity.ac.in', description: 'Historic; Sociology', category: 'Arts', city: 'Ranchi', state: 'Jharkhand' },
    { name: 'XLRI Jamshedpur', website: 'https://xlri.ac.in', description: 'NIRF #9; HR focus', category: 'Management', city: 'Jamshedpur', state: 'Jharkhand' },
    
    // Karnataka
    { name: 'IIT Dharwad', website: 'https://iitdh.ac.in', description: 'NIRF #81; New IIT', category: 'Engineering', city: 'Dharwad', state: 'Karnataka' },
    { name: 'Bangalore Medical College', website: 'https://bmcri.org', description: 'NIRF #44; Urban hub', category: 'Medical', city: 'Bangalore', state: 'Karnataka' },
    { name: 'Christ University', website: 'https://christuniversity.in', description: 'NIRF #67; Liberal Arts', category: 'Arts', city: 'Bangalore', state: 'Karnataka' },
    { name: 'IIM Bangalore', website: 'https://iimb.ac.in', description: 'NIRF #2; Elite', category: 'Management', city: 'Bangalore', state: 'Karnataka' },
    
    // Kerala
    { name: 'NIT Calicut', website: 'https://nitc.ac.in', description: 'NIRF #25; Architecture', category: 'Engineering', city: 'Calicut', state: 'Kerala' },
    { name: 'Government Medical College Thiruvananthapuram', website: 'https://gmctvm.ac.in', description: 'NIRF #44; Legacy', category: 'Medical', city: 'Thiruvananthapuram', state: 'Kerala' },
    { name: 'University of Calicut', website: 'https://uoc.ac.in', description: 'NIRF #101-150; Malayalam', category: 'Arts', city: 'Malappuram', state: 'Kerala' },
    { name: 'IIM Kozhikode', website: 'https://iimk.ac.in', description: 'NIRF #3; Innovation', category: 'Management', city: 'Kozhikode', state: 'Kerala' },
    
    // Madhya Pradesh
    { name: 'IIT Indore', website: 'https://iiti.ac.in', description: 'NIRF #14; AI focus', category: 'Engineering', city: 'Indore', state: 'Madhya Pradesh' },
    { name: 'Gandhi Medical College', website: 'https://gmcbhopal.edu.in', description: 'NIRF #49; Central', category: 'Medical', city: 'Bhopal', state: 'Madhya Pradesh' },
    { name: 'Devi Ahilya Vishwavidyalaya', website: 'https://dauniv.ac.in', description: 'NIRF #101-150; Fine Arts', category: 'Arts', city: 'Indore', state: 'Madhya Pradesh' },
    { name: 'IIM Indore', website: 'https://iimidr.ac.in', description: 'NIRF #7; Integrated', category: 'Management', city: 'Indore', state: 'Madhya Pradesh' },
    
    // Maharashtra
    { name: 'IIT Bombay', website: 'https://iitb.ac.in', description: 'NIRF #3; Global top', category: 'Engineering', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Grant Medical College', website: 'https://kem.edu', description: 'NIRF #16; Historic', category: 'Medical', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'St. Xaviers College Mumbai', website: 'https://xaviers.edu', description: 'NIRF #7; Elite', category: 'Arts', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'IIM Mumbai', website: 'https://iimmumbai.ac.in', description: 'NIRF #7; New IIM', category: 'Management', city: 'Mumbai', state: 'Maharashtra' },
    
    // Manipur
    { name: 'NIT Manipur', website: 'https://nitm.ac.in', description: 'NIRF #101-150; Civil', category: 'Engineering', city: 'Imphal', state: 'Manipur' },
    { name: 'RIMS Imphal', website: 'https://rims.edu.in', description: 'State flagship', category: 'Medical', city: 'Imphal', state: 'Manipur' },
    { name: 'Manipur University', website: 'https://manipuruniv.ac.in', description: 'NIRF #101-150; Regional', category: 'Arts', city: 'Imphal', state: 'Manipur' },
    { name: 'Manipur Technical University', website: 'https://mtu.ac.in', description: 'Emerging B-school', category: 'Management', city: 'Imphal', state: 'Manipur' },
    
    // Meghalaya
    { name: 'NIT Meghalaya', website: 'https://nitsm.ac.in', description: 'NIRF #80; CSE', category: 'Engineering', city: 'Shillong', state: 'Meghalaya' },
    { name: 'NEIGRIHMS', website: 'https://neigrihms.nic.in', description: 'NIRF #28; Regional', category: 'Medical', city: 'Shillong', state: 'Meghalaya' },
    { name: 'NEHU Shillong', website: 'https://nehu.ac.in', description: 'NIRF #74; Northeast hub', category: 'Arts', city: 'Shillong', state: 'Meghalaya' },
    { name: 'IIM Shillong', website: 'https://iimshillong.in', description: 'NIRF #24; Rural', category: 'Management', city: 'Shillong', state: 'Meghalaya' },
    
    // Mizoram
    { name: 'NIT Mizoram', website: 'https://nittm.ac.in', description: 'NIRF #101-150; Electronics', category: 'Engineering', city: 'Aizawl', state: 'Mizoram' },
    { name: 'Zoram Medical College', website: 'https://zmc.edu.in', description: 'New state college', category: 'Medical', city: 'Falkawn', state: 'Mizoram' },
    { name: 'Mizoram University', website: 'https://mzu.edu.in', description: 'NIRF #82; Tribal studies', category: 'Arts', city: 'Aizawl', state: 'Mizoram' },
    { name: 'ICFAI Mizoram', website: 'https://iumizoram.edu.in', description: 'Affordable MBA', category: 'Management', city: 'Aizawl', state: 'Mizoram' },
    
    // Nagaland
    { name: 'NIT Nagaland', website: 'https://nitnagaland.ac.in', description: 'NIRF #101-150; Emerging', category: 'Engineering', city: 'Chumoukedima', state: 'Nagaland' },
    { name: 'Naga Hospital Authority', website: 'https://nagahospital.org', description: 'State referral', category: 'Medical', city: 'Kohima', state: 'Nagaland' },
    { name: 'Nagaland University', website: 'https://nagalanduniversity.ac.in', description: 'NIRF #101-150; Local focus', category: 'Arts', city: 'Lumami', state: 'Nagaland' },
    { name: 'Kohima Science College', website: 'https://kscollege.edu.in', description: 'BBA programs', category: 'Management', city: 'Kohima', state: 'Nagaland' },
    
    // Odisha
    { name: 'NIT Rourkela', website: 'https://nitrkl.ac.in', description: 'NIRF #16; Research', category: 'Engineering', city: 'Rourkela', state: 'Odisha' },
    { name: 'SCB Medical College', website: 'https://scbmch.gov.in', description: 'NIRF #48; Legacy', category: 'Medical', city: 'Cuttack', state: 'Odisha' },
    { name: 'Utkal University', website: 'https://utkaluniversity.ac.in', description: 'NIRF #101-150; Odia lit', category: 'Arts', city: 'Bhubaneswar', state: 'Odisha' },
    { name: 'IIM Sambalpur', website: 'https://iimsambalpur.ac.in', description: 'NIRF #50; New', category: 'Management', city: 'Sambalpur', state: 'Odisha' },
    
    // Punjab
    { name: 'IIT Ropar', website: 'https://iitrpr.ac.in', description: 'NIRF #22; AI', category: 'Engineering', city: 'Ropar', state: 'Punjab' },
    { name: 'Government Medical College Patiala', website: 'https://gmcpatiala.edu.in', description: 'State top', category: 'Medical', city: 'Patiala', state: 'Punjab' },
    { name: 'Panjab University', website: 'https://puchd.ac.in', description: 'NIRF #44; Comprehensive', category: 'Arts', city: 'Chandigarh', state: 'Punjab' },
    { name: 'IIM Amritsar', website: 'https://iimamritsar.ac.in', description: 'NIRF #76; Emerging', category: 'Management', city: 'Amritsar', state: 'Punjab' },
    
    // Rajasthan
    { name: 'MNIT Jaipur', website: 'https://mnit.ac.in', description: 'NIRF #46; Architecture', category: 'Engineering', city: 'Jaipur', state: 'Rajasthan' },
    { name: 'SMS Medical College', website: 'https://smsmedicalcollege.com', description: 'NIRF #49; High volume', category: 'Medical', city: 'Jaipur', state: 'Rajasthan' },
    { name: 'Rajasthan University', website: 'https://uniraj.ac.in', description: 'NIRF #101-150; History', category: 'Arts', city: 'Jaipur', state: 'Rajasthan' },
    { name: 'IIM Udaipur', website: 'https://iimu.ac.in', description: 'NIRF #13; Retail', category: 'Management', city: 'Udaipur', state: 'Rajasthan' },
    { name: 'BITS Pilani', website: 'https://bits-pilani.ac.in', description: 'NIRF #20; Elite institute', category: 'Engineering', city: 'Pilani', state: 'Rajasthan' },
    
    // Sikkim
    { name: 'Sikkim Manipal Institute of Technology', website: 'https://smit.smu.edu.in', description: 'NIRF #101-150; IT', category: 'Engineering', city: 'Majitar', state: 'Sikkim' },
    { name: 'Sikkim Manipal Institute of Medical Sciences', website: 'https://smims.smu.edu.in', description: 'Private top', category: 'Medical', city: 'Gangtok', state: 'Sikkim' },
    { name: 'Sikkim University', website: 'https://cus.ac.in', description: 'NIRF #101-150; Bhutia', category: 'Arts', city: 'Gangtok', state: 'Sikkim' },
    { name: 'Sikkim Manipal University', website: 'https://smu.edu.in', description: 'Affordable MBA', category: 'Management', city: 'Gangtok', state: 'Sikkim' },
    
    // Tamil Nadu
    { name: 'IIT Madras', website: 'https://iitm.ac.in', description: 'NIRF #1; Elite', category: 'Engineering', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Madras Medical College', website: 'https://mmc.ac.in', description: 'NIRF #6; Historic', category: 'Medical', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Loyola College', website: 'https://loyolacollege.edu', description: 'NIRF #9; Social Sciences', category: 'Arts', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'IIM Trichy', website: 'https://iimtrichy.ac.in', description: 'NIRF #4; Operations', category: 'Management', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
    { name: 'NIT Trichy', website: 'https://nitt.edu', description: 'NIRF #9; Premier NIT', category: 'Engineering', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
    
    // Telangana
    { name: 'IIT Hyderabad', website: 'https://iith.ac.in', description: 'NIRF #8; AI', category: 'Engineering', city: 'Hyderabad', state: 'Telangana' },
    { name: 'Osmania Medical College', website: 'https://omc.gov.in', description: 'NIRF #48; Legacy', category: 'Medical', city: 'Hyderabad', state: 'Telangana' },
    { name: 'Osmania University', website: 'https://osmania.ac.in', description: 'NIRF #101-150; Telugu', category: 'Arts', city: 'Hyderabad', state: 'Telangana' },
    { name: 'IIM Hyderabad', website: 'https://iimh.ac.in', description: 'NIRF #3; Analytics', category: 'Management', city: 'Hyderabad', state: 'Telangana' },
    
    // Tripura
    { name: 'NIT Agartala', website: 'https://nita.ac.in', description: 'NIRF #91; Civil', category: 'Engineering', city: 'Agartala', state: 'Tripura' },
    { name: 'Agartala Government Medical College', website: 'https://agmc.nic.in', description: 'State flagship', category: 'Medical', city: 'Agartala', state: 'Tripura' },
    { name: 'Tripura University', website: 'https://tripurauniv.ac.in', description: 'NIRF #101-150; Bengali', category: 'Arts', city: 'Agartala', state: 'Tripura' },
    { name: 'ICFAI Tripura', website: 'https://iutripura.edu.in', description: 'BBA/MBA', category: 'Management', city: 'Agartala', state: 'Tripura' },
    
    // Uttar Pradesh
    { name: 'IIT Kanpur', website: 'https://iitk.ac.in', description: 'NIRF #4; Aerospace', category: 'Engineering', city: 'Kanpur', state: 'Uttar Pradesh' },
    { name: 'King Georges Medical University', website: 'https://kgmu.org', description: 'NIRF #8; Premier', category: 'Medical', city: 'Lucknow', state: 'Uttar Pradesh' },
    { name: 'Lucknow University', website: 'https://lkouniv.ac.in', description: 'NIRF #101-150; Urdu', category: 'Arts', city: 'Lucknow', state: 'Uttar Pradesh' },
    { name: 'IIM Lucknow', website: 'https://iiml.ac.in', description: 'NIRF #6; Agribusiness', category: 'Management', city: 'Lucknow', state: 'Uttar Pradesh' },
    { name: 'IIT BHU Varanasi', website: 'https://iitbhu.ac.in', description: 'NIRF #10; Heritage IIT', category: 'Engineering', city: 'Varanasi', state: 'Uttar Pradesh' },
    { name: 'Aligarh Muslim University', website: 'https://amu.ac.in', description: 'Central university; Multidisciplinary', category: 'Arts', city: 'Aligarh', state: 'Uttar Pradesh' },
    
    // Uttarakhand
    { name: 'IIT Roorkee', website: 'https://iitr.ac.in', description: 'NIRF #5; Civil', category: 'Engineering', city: 'Roorkee', state: 'Uttarakhand' },
    { name: 'AIIMS Rishikesh', website: 'https://aiimsrishikesh.edu.in', description: 'NIRF #15; New', category: 'Medical', city: 'Rishikesh', state: 'Uttarakhand' },
    { name: 'Kumaun University', website: 'https://kumaununiversity.ac.in', description: 'Regional focus', category: 'Arts', city: 'Nainital', state: 'Uttarakhand' },
    { name: 'IIM Kashipur', website: 'https://iimkashipur.ac.in', description: 'NIRF #56; Sustainability', category: 'Management', city: 'Kashipur', state: 'Uttarakhand' },
    
    // West Bengal
    { name: 'IIT Kharagpur', website: 'https://iitkgp.ac.in', description: 'NIRF #6; All-rounder', category: 'Engineering', city: 'Kharagpur', state: 'West Bengal' },
    { name: 'IPGMER Kolkata', website: 'https://ipgmer.gov.in', description: 'NIRF #33; SSKM Hospital', category: 'Medical', city: 'Kolkata', state: 'West Bengal' },
    { name: 'St. Xaviers College Kolkata', website: 'https://sxccal.edu', description: 'NIRF #7; Elite', category: 'Arts', city: 'Kolkata', state: 'West Bengal' },
    { name: 'IIM Calcutta', website: 'https://iimcal.ac.in', description: 'NIRF #5; Finance', category: 'Management', city: 'Kolkata', state: 'West Bengal' },
    { name: 'Jadavpur University', website: 'https://jadavpuruniversity.in', description: 'NIRF #12; Premier state university', category: 'Engineering', city: 'Kolkata', state: 'West Bengal' },
    
    // Delhi (Union Territory)
    { name: 'IIT Delhi', website: 'https://iitd.ac.in', description: 'NIRF #2; Premier engineering institute', category: 'Engineering', city: 'New Delhi', state: 'Delhi' },
    { name: 'AIIMS Delhi', website: 'https://aiims.edu', description: 'NIRF #1; Top medical institute', category: 'Medical', city: 'New Delhi', state: 'Delhi' },
    { name: 'St. Stephens College', website: 'https://ststephens.edu', description: 'Premier arts and science college', category: 'Arts', city: 'New Delhi', state: 'Delhi' },
    { name: 'Delhi University', website: 'https://du.ac.in', description: 'Central university with multiple colleges', category: 'Arts', city: 'New Delhi', state: 'Delhi' },
    { name: 'Faculty of Management Studies DU', website: 'https://fms.edu', description: 'NIRF #8; Top B-school', category: 'Management', city: 'New Delhi', state: 'Delhi' },
    { name: 'DTU Delhi', website: 'https://dtu.ac.in', description: 'NIRF #36; State technical university', category: 'Engineering', city: 'New Delhi', state: 'Delhi' },
    { name: 'NSUT Delhi', website: 'https://nsut.ac.in', description: 'State engineering college', category: 'Engineering', city: 'New Delhi', state: 'Delhi' },
    { name: 'Jamia Millia Islamia', website: 'https://jmi.ac.in', description: 'NIRF #34; Central university', category: 'Arts', city: 'New Delhi', state: 'Delhi' },
    { name: 'Lady Shri Ram College', website: 'https://lsr.edu.in', description: 'Top womens college', category: 'Arts', city: 'New Delhi', state: 'Delhi' },
    { name: 'Hindu College DU', website: 'https://hinducollege.ac.in', description: 'Premier DU college', category: 'Arts', city: 'New Delhi', state: 'Delhi' },
    
    // Chandigarh (Union Territory)
    { name: 'PEC Chandigarh', website: 'https://pec.ac.in', description: 'NIRF #52; Premier engineering college', category: 'Engineering', city: 'Chandigarh', state: 'Chandigarh' },
    { name: 'PGIMER Chandigarh', website: 'https://pgimer.edu.in', description: 'NIRF #4; Top medical institute', category: 'Medical', city: 'Chandigarh', state: 'Chandigarh' },
    
    // Puducherry (Union Territory)
    { name: 'JIPMER Puducherry', website: 'https://jipmer.edu.in', description: 'NIRF #13; Premier medical institute', category: 'Medical', city: 'Puducherry', state: 'Puducherry' },
    { name: 'Pondicherry University', website: 'https://pondiuni.edu.in', description: 'Central university; Multidisciplinary', category: 'Arts', city: 'Puducherry', state: 'Puducherry' },
    
    // === ADDITIONAL COLLEGES FOR ALL CATEGORIES ===
    
    // SCIENCE Colleges
    { name: 'St. Xaviers College Science Mumbai', website: 'https://xaviers.edu', description: 'Top science programs; NAAC A++', category: 'Science', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Presidency College Chennai', website: 'https://presidencychennai.ac.in', description: 'Premier science college', category: 'Science', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Fergusson College Pune', website: 'https://fergusson.edu', description: 'Top science college; NIRF ranked', category: 'Science', city: 'Pune', state: 'Maharashtra' },
    { name: 'St. Stephens College Science', website: 'https://ststephens.edu', description: 'Elite science programs', category: 'Science', city: 'New Delhi', state: 'Delhi' },
    { name: 'Loyola College Science', website: 'https://loyolacollege.edu', description: 'Strong science departments', category: 'Science', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Ramjas College Science', website: 'https://ramjas.du.ac.in', description: 'DU science college', category: 'Science', city: 'New Delhi', state: 'Delhi' },
    { name: 'Kirori Mal College Science', website: 'https://kmc.du.ac.in', description: 'Premier DU science college', category: 'Science', city: 'New Delhi', state: 'Delhi' },
    { name: 'Hansraj College Science', website: 'https://hansrajcollege.ac.in', description: 'Top science college DU', category: 'Science', city: 'New Delhi', state: 'Delhi' },
    
    // COMMERCE Colleges
    { name: 'Shri Ram College of Commerce', website: 'https://srcc.edu', description: 'NIRF #1 Commerce; Elite', category: 'Commerce', city: 'New Delhi', state: 'Delhi' },
    { name: 'Lady Shri Ram College Commerce', website: 'https://lsr.edu.in', description: 'Top womens commerce college', category: 'Commerce', city: 'New Delhi', state: 'Delhi' },
    { name: 'St. Xaviers College Commerce Mumbai', website: 'https://xaviers.edu', description: 'Premier commerce programs', category: 'Commerce', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'HR College of Commerce', website: 'https://hrcollege.edu', description: 'Top Mumbai commerce college', category: 'Commerce', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Loyola College Commerce', website: 'https://loyolacollege.edu', description: 'Strong commerce department', category: 'Commerce', city: 'Chennai', state: 'Tamil Nadu' },
    { name: 'Christ University Commerce', website: 'https://christuniversity.in', description: 'NIRF ranked commerce programs', category: 'Commerce', city: 'Bangalore', state: 'Karnataka' },
    { name: 'Symbiosis College Pune', website: 'https://siu.edu.in', description: 'Top commerce college', category: 'Commerce', city: 'Pune', state: 'Maharashtra' },
    
    // LAW Colleges
    { name: 'National Law School Bangalore', website: 'https://nls.ac.in', description: 'NIRF #1; Premier NLU', category: 'Law', city: 'Bangalore', state: 'Karnataka' },
    { name: 'NALSAR Hyderabad', website: 'https://nalsar.ac.in', description: 'NIRF #2; Top law school', category: 'Law', city: 'Hyderabad', state: 'Telangana' },
    { name: 'NLU Delhi', website: 'https://nludelhi.ac.in', description: 'NIRF #3; Premier NLU', category: 'Law', city: 'New Delhi', state: 'Delhi' },
    { name: 'NUJS Kolkata', website: 'https://nujs.edu', description: 'NIRF #5; Top law school', category: 'Law', city: 'Kolkata', state: 'West Bengal' },
    { name: 'NLU Jodhpur', website: 'https://nlujodhpur.ac.in', description: 'Top national law university', category: 'Law', city: 'Jodhpur', state: 'Rajasthan' },
    { name: 'ILS Law College Pune', website: 'https://ilslaw.edu', description: 'Historic law college', category: 'Law', city: 'Pune', state: 'Maharashtra' },
    { name: 'Government Law College Mumbai', website: 'https://glc.edu', description: 'Premier state law college', category: 'Law', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Faculty of Law DU', website: 'https://lawfaculty.du.ac.in', description: 'DU law faculty', category: 'Law', city: 'New Delhi', state: 'Delhi' },
    
    // ARCHITECTURE Colleges
    { name: 'SPA Delhi', website: 'https://spa.ac.in', description: 'NIRF #1; Premier architecture school', category: 'Architecture', city: 'New Delhi', state: 'Delhi' },
    { name: 'IIT Kharagpur Architecture', website: 'https://iitkgp.ac.in', description: 'Top architecture program', category: 'Architecture', city: 'Kharagpur', state: 'West Bengal' },
    { name: 'IIT Roorkee Architecture', website: 'https://iitr.ac.in', description: 'Premier architecture department', category: 'Architecture', city: 'Roorkee', state: 'Uttarakhand' },
    { name: 'CEPT University', website: 'https://cept.ac.in', description: 'Top architecture & planning', category: 'Architecture', city: 'Ahmedabad', state: 'Gujarat' },
    { name: 'SPA Bhopal', website: 'https://spabhopal.ac.in', description: 'School of Planning & Architecture', category: 'Architecture', city: 'Bhopal', state: 'Madhya Pradesh' },
    { name: 'NIT Trichy Architecture', website: 'https://nitt.edu', description: 'NIRF ranked architecture', category: 'Architecture', city: 'Tiruchirappalli', state: 'Tamil Nadu' },
    
    // AGRICULTURE Colleges
    { name: 'IARI Delhi', website: 'https://iari.res.in', description: 'Indian Agricultural Research Institute; Premier', category: 'Agriculture', city: 'New Delhi', state: 'Delhi' },
    { name: 'GBPUAT Pantnagar', website: 'https://gbpuat.ac.in', description: 'Top agricultural university', category: 'Agriculture', city: 'Pantnagar', state: 'Uttarakhand' },
    { name: 'Punjab Agricultural University', website: 'https://pau.edu', description: 'NIRF ranked; Green revolution hub', category: 'Agriculture', city: 'Ludhiana', state: 'Punjab' },
    { name: 'Tamil Nadu Agricultural University', website: 'https://tnau.ac.in', description: 'Premier agricultural university', category: 'Agriculture', city: 'Coimbatore', state: 'Tamil Nadu' },
    { name: 'ANGRAU Hyderabad', website: 'https://angrau.ac.in', description: 'Top agricultural research university', category: 'Agriculture', city: 'Hyderabad', state: 'Telangana' },
    { name: 'BCKV West Bengal', website: 'https://bckv.edu.in', description: 'Agricultural university', category: 'Agriculture', city: 'Mohanpur', state: 'West Bengal' },
    
    // PHARMACY Colleges
    { name: 'NIPER Mohali', website: 'https://niper.gov.in', description: 'NIRF #1; Premier pharmacy institute', category: 'Pharmacy', city: 'Mohali', state: 'Punjab' },
    { name: 'Jamia Hamdard Pharmacy', website: 'https://jamiahamdard.edu', description: 'Top pharmacy programs', category: 'Pharmacy', city: 'New Delhi', state: 'Delhi' },
    { name: 'ICT Mumbai Pharmacy', website: 'https://ictmumbai.edu.in', description: 'Institute of Chemical Technology; Top pharmacy', category: 'Pharmacy', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'BHU Pharmacy', website: 'https://bhu.ac.in', description: 'Banaras Hindu University pharmacy', category: 'Pharmacy', city: 'Varanasi', state: 'Uttar Pradesh' },
    { name: 'JSS College of Pharmacy', website: 'https://jsscp.edu.in', description: 'NIRF ranked pharmacy college', category: 'Pharmacy', city: 'Mysore', state: 'Karnataka' },
    { name: 'Manipal College of Pharmacy', website: 'https://manipal.edu', description: 'Top pharmacy college', category: 'Pharmacy', city: 'Manipal', state: 'Karnataka' },
    
    // EDUCATION Colleges
    { name: 'NCERT Delhi', website: 'https://ncert.nic.in', description: 'National Council of Educational Research', category: 'Education', city: 'New Delhi', state: 'Delhi' },
    { name: 'TISS Mumbai', website: 'https://tiss.edu', description: 'Tata Institute of Social Sciences; Education programs', category: 'Education', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Jamia Millia Education', website: 'https://jmi.ac.in', description: 'Top education faculty', category: 'Education', city: 'New Delhi', state: 'Delhi' },
    { name: 'BHU Education', website: 'https://bhu.ac.in', description: 'Education faculty BHU', category: 'Education', city: 'Varanasi', state: 'Uttar Pradesh' },
    { name: 'MS University Education', website: 'https://msubaroda.ac.in', description: 'Education department', category: 'Education', city: 'Vadodara', state: 'Gujarat' },
    
    // DESIGN Colleges
    { name: 'NID Ahmedabad', website: 'https://nid.edu', description: 'NIRF #1; National Institute of Design', category: 'Design', city: 'Ahmedabad', state: 'Gujarat' },
    { name: 'IIT Bombay IDC', website: 'https://iitb.ac.in', description: 'Industrial Design Centre; Premier', category: 'Design', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'NID Bangalore', website: 'https://nid.edu', description: 'NID campus Bangalore', category: 'Design', city: 'Bangalore', state: 'Karnataka' },
    { name: 'NIFT Delhi', website: 'https://nift.ac.in', description: 'National Institute of Fashion Technology', category: 'Design', city: 'New Delhi', state: 'Delhi' },
    { name: 'Pearl Academy', website: 'https://pearlacademy.com', description: 'Top design & fashion institute', category: 'Design', city: 'New Delhi', state: 'Delhi' },
    { name: 'MIT Institute of Design', website: 'https://mitid.edu.in', description: 'Premier design institute', category: 'Design', city: 'Pune', state: 'Maharashtra' },
    { name: 'Srishti Manipal', website: 'https://srishtimanipalinstitute.in', description: 'Art, design & technology', category: 'Design', city: 'Bangalore', state: 'Karnataka' },
    
    // MASS COMMUNICATION Colleges
    { name: 'IIMC Delhi', website: 'https://iimc.gov.in', description: 'Indian Institute of Mass Communication; Premier', category: 'Mass Communication', city: 'New Delhi', state: 'Delhi' },
    { name: 'Jamia Mass Communication', website: 'https://jmi.ac.in', description: 'Top mass communication program', category: 'Mass Communication', city: 'New Delhi', state: 'Delhi' },
    { name: 'Symbiosis Pune Mass Comm', website: 'https://siu.edu.in', description: 'Top media & communication institute', category: 'Mass Communication', city: 'Pune', state: 'Maharashtra' },
    { name: 'Xavier Institute of Communication', website: 'https://xic.edu.in', description: 'Premier communication institute', category: 'Mass Communication', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Mudra Institute Ahmedabad', website: 'https://mica.ac.in', description: 'MICA; Top communication college', category: 'Mass Communication', city: 'Ahmedabad', state: 'Gujarat' },
    { name: 'ACJ Chennai', website: 'https://acjindia.com', description: 'Asian College of Journalism', category: 'Mass Communication', city: 'Chennai', state: 'Tamil Nadu' },
    
    // HOTEL MANAGEMENT Colleges
    { name: 'IHM Pusa Delhi', website: 'https://ihmpusa.edu.in', description: 'NIRF #1; Premier hotel management', category: 'Hotel Management', city: 'New Delhi', state: 'Delhi' },
    { name: 'IHM Mumbai', website: 'https://ihmmumbai.gov.in', description: 'Top hotel management institute', category: 'Hotel Management', city: 'Mumbai', state: 'Maharashtra' },
    { name: 'Welcomgroup Graduate School', website: 'https://wgsha.com', description: 'ITC hotel management school', category: 'Hotel Management', city: 'Manipal', state: 'Karnataka' },
    { name: 'Christ University Hospitality', website: 'https://christuniversity.in', description: 'Hotel management programs', category: 'Hotel Management', city: 'Bangalore', state: 'Karnataka' },
    { name: 'IHM Chennai', website: 'https://ihmchennai.gov.in', description: 'Institute of Hotel Management', category: 'Hotel Management', city: 'Chennai', state: 'Tamil Nadu' },
    
    // SPORTS Colleges
    { name: 'NIS Patiala', website: 'https://nis.nic.in', description: 'Netaji Subhas National Institute of Sports', category: 'Sports', city: 'Patiala', state: 'Punjab' },
    { name: 'Lakshmibai NIS Gwalior', website: 'https://lnipe.edu.in', description: 'Premier sports university', category: 'Sports', city: 'Gwalior', state: 'Madhya Pradesh' },
    { name: 'SAI Bangalore', website: 'https://sportsauthorityofindia.nic.in', description: 'Sports Authority of India', category: 'Sports', city: 'Bangalore', state: 'Karnataka' },
    { name: 'Sports College Pune', website: 'https://dsypune.gov.in', description: 'Sports science programs', category: 'Sports', city: 'Pune', state: 'Maharashtra' },
    
    // === REQUESTED COLLEGES ===
    
    // Punjab - Requested colleges
    { name: 'Lovely Professional University', website: 'https://lpu.in', description: 'NIRF #50; Large private university; Excellent placements', category: 'Engineering', city: 'Phagwara', state: 'Punjab' },
    { name: 'DAV University Jalandhar', website: 'https://davuniversity.org', description: 'DAV University; Engineering & management', category: 'Engineering', city: 'Jalandhar', state: 'Punjab' },
    { name: 'Pyramid College of Business & Technology', website: 'https://pyramidcolleges.com', description: 'Top private college; Strong placements', category: 'Management', city: 'Phagwara', state: 'Punjab' },
    
    // Chandigarh - Additional colleges
    { name: 'DAV College Chandigarh', website: 'https://davchd.ac.in', description: 'Premier DAV college; Multi-disciplinary', category: 'Arts', city: 'Chandigarh', state: 'Chandigarh' },
  ]

  for (const college of colleges) {
    await prisma.college.create({
      data: college,
    })
  }

  console.log(`✅ Seeded 1 admin and ${colleges.length} colleges across all Indian states and UTs`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
